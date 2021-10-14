import { on, createAction, createReducer, props } from '@ngrx/store';
import { intialToyState, Toy } from './toy.types';

export const toyActions = {
  add: createAction('Toy add', props<Toy>()),
  edit: createAction('Toy edit', props<Toy>()),
  remove: createAction('Toy remove', props<{ id: number }>()),
};

export const toyReducer = createReducer(
  intialToyState,
  on(toyActions.add, (state, payload) => {
    return {
      ...state,
      items: [{ ...payload }, ...state.items],
    };
  }),
  on(toyActions.edit, (state, payload) => {
    const items = state.items.map((el) => {
      if (el.id === payload.id) {
        return { ...payload };
      } else {
        return el;
      }
    });

    return {
      ...state,
      items,
    };
  }),
  on(toyActions.remove, (state, payload) => {
    return {
      ...state,
      items: state.items.filter((el) => el.id !== payload.id),
    };
  })
);
