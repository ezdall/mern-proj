import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../api/apiSlice';

const notesAdapter = createEntityAdapter({
  // sort-compare function
  sortComparer(a, b) {
    if (a.completed === b.completed) return 0;

    return a.completed ? 1 : -1;
  }
});

const initiateState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getNotes: builder.query({
      query() {
        return '/notes';
      },
      validateStatus(response, result) {
        return response.status === 200 && !result.isError;
      },
      transformResponse(responseData) {
        const loadNotes = responseData.map(note => {
          return { ...note, id: note._id };
        });
        return notesAdapter.setAll(initiateState, loadNotes);
      },
      providesTags(result, error, arg) {
        if (result?.ids) {
          return [
            { type: 'Note', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'Note', id }))
          ];
        }
        return [{ type: 'Note', id: 'LIST' }];
      }
    }),
    // crud add
    addNewNote: builder.mutation({
      query(initialNoteData) {
        return {
          url: '/notes',
          method: 'POST',
          body: {
            ...initialNoteData
          }
        };
      },
      invalidatesTags: [{ type: 'Note', id: 'LIST' }]
    }),
    // update
    updateNote: builder.mutation({
      query(initialNoteData) {
        return {
          url: `/notes/${initialNoteData.id}`,
          method: 'PATCH',
          body: { ...initialNoteData }
        };
      },
      invalidatesTags(result, error, arg) {
        return [{ type: 'Note', id: arg.id }];
      }
    }),
    // delete
    deleteNote: builder.mutation({
      query({ id }) {
        return {
          url: `/notes/${id}`,
          method: 'DELETE'
          // body: { id }
        };
      },
      invalidatesTags(result, error, arg) {
        return [{ type: 'Note', id: arg.id }];
      }
    })
  })
});

export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation
} = notesApiSlice;

// returns the query results object
export const selectNoteResult = notesApiSlice.endpoints.getNotes.select();

// create memoized selector
const selectNotesData = createSelector(
  selectNoteResult,
  notesResult => notesResult.data // normalized state object with ids & entities
);

// getselectors create these selectors and we rename them w/ aliases
export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNoteIds
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initiateState);
