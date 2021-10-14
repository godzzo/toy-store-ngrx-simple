import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { toyReducer } from './toy.definition';

export const storeImports = [
  StoreModule.forRoot({ toy: toyReducer }),
  StoreDevtoolsModule.instrument({
    maxAge: 50,
    logOnly: false,
  }),
  // EffectsModule.forRoot(effects),
];
