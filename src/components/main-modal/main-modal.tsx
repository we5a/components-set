import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'main-modal',
  styleUrl: 'main-modal.css',
  shadow: true,
})
export class MainModal {
  @State() nameInput: string = '';

  handleName() {
    console.log('Need to save name', this.nameInput);
  }

  handleChange(e: InputEvent) {
    e.preventDefault();
    this.nameInput = (e.target as HTMLInputElement).value;
  }

  cancelModal() {
    console.log('Need to cancel modal');
    this.nameInput = '';
  }

  render() {
    return (
      <Host>
        <div class="modal-window">
          <div class="modal-label">Enter name:</div>
          <input type="text" class="name-input" value={this.nameInput} onInput={this.handleChange.bind(this)}/>
          <div class="button-block">
            <button onClick={this.cancelModal.bind(this)} class="modal-button">Cancel</button>
            <button onClick={this.handleName.bind(this)} class="modal-button">OK</button>
          </div>
         </div>
      </Host>
    );
  }
}
