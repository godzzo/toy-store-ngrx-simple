import {
  on,
  createAction,
  createSelector,
  createReducer,
  props,
} from '@ngrx/store';
import { intialToyState, Toy, ToyState } from './toy.types';

export const toyActions = {
  add: createAction('Toy add', props<Toy>()),
  edit: createAction('Toy edit', props<Toy>()),
  choose: createAction('Toy choose', props<Toy>()),
  create: createAction('Toy create'),
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
  on(toyActions.choose, (state, payload) => {
    return {
      ...state,
      mode: 'edit',
      current: payload,
    };
  }),
  on(toyActions.create, (state, payload) => {
    const id = state.items.length + 1;

    return {
      ...state,
      mode: 'new',
      current: {
        id,
        name: `NEW-${state.items.length}-${new Date().toISOString()}`,
      },
    };
  }),
  on(toyActions.remove, (state, payload) => {
    return {
      ...state,
      items: state.items.filter((el) => el.id !== payload.id),
    };
  })
);

export const selectFeature = (state: { toy: ToyState }) => state.toy;

export const toySelectors = {
  current: createSelector(selectFeature, (state: ToyState) => state.current),
  items: createSelector(selectFeature, (state: ToyState) => state.items),
  mode: createSelector(selectFeature, (state: ToyState) => state.mode),
  currentAndMode: createSelector(selectFeature, (state: ToyState) => ({
    mode: state.mode,
    current: state.current,
  })),
};
