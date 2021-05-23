import { Component, Host, h, State, Prop } from '@stencil/core';

@Component({
  tag: 'main-modal',
  styleUrl: 'main-modal.css',
  shadow: true,
})
export class MainModal {
  @State() nameInput: string = '';
  @Prop() cancelModal: () => void;
  @Prop() handleResult: (name: string) => void;

  handleName() {
    if (this.nameInput) {
      this.handleResult(this.nameInput);
    }
  }

  handleChange(e: InputEvent) {
    e.preventDefault();
    this.nameInput = (e.target as HTMLInputElement).value;
  }

  render() {
    return (
      <Host>
        <div class="modal-window">
          <div class="modal-label">Enter name:</div>
          <input required type="text" class="name-input" value={this.nameInput} onInput={this.handleChange.bind(this)}/>
          <div class="button-block">
            <button onClick={this.cancelModal} class="modal-button">Cancel</button>
            <button onClick={this.handleName.bind(this)} class="modal-button">OK</button>
          </div>
         </div>
      </Host>
    );
  }
}
