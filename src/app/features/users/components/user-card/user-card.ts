import { Component, input, output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.html',
})
export class UserCard {
  readonly info = input.required<User>();

  readonly details = output<string>();
  readonly remove = output<string>();

  protected onDetails() {
    //Devolver el Código del usuario que se quiere ver el detalle
    this.details.emit(this.info().username);
  }

  protected onRemove() {
    if (confirm('Está seguro en Eliminar este Usuario?')) {
      this.remove.emit(this.info().username);
    }
  }
}
