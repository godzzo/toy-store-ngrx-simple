import { Component, VERSION } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

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
    map(({ current, mode }) => {
      return {
        mode,
        toy: current,
        form: this.formBuilder.group({ id: current.id, name: current.name }),
      };
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
}
