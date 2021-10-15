import { Component, VERSION } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { toyActions, toySelectors } from '../store/toy.definition';
import { Toy } from '../store/toy.types';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  current$ = this.store.select(toySelectors.currentAndMode).pipe(
    tap((parms) => console.log('current$ - tap', { ...parms })),
    map(({ current, mode }) => {
      return {
        mode,
        toy: current,
        form: this.formBuilder.group({ id: current.id, name: current.name }),
      };
    })
  );
  withoutComposite$ = combineLatest([
    this.store.select(toySelectors.current),
    this.store.select(toySelectors.mode),
  ]).pipe(
    map(([current, mode]) => {
      console.log('withoutComposite$ - tap', { current, mode });
      return { current, mode };
    })
  );

  items$ = this.store.select(toySelectors.items);
  mode$ = this.store.select(toySelectors.mode);

  constructor(private store: Store, private formBuilder: FormBuilder) {}

  onEdit(toy: Toy) {
    this.store.dispatch(toyActions.choose(toy));
  }

  onNew() {
    this.store.dispatch(toyActions.create());
  }

  onSave(mode: 'new' | 'edit', toy: Toy) {
    if (mode === 'new') {
      this.store.dispatch(toyActions.add(toy));
    } else {
      this.store.dispatch(toyActions.edit(toy));
    }
  }

  onRemove(item: Toy) {
    this.store.dispatch(toyActions.remove(item));
  }
}
