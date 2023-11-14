// import stuff
import { LitElement, html, css } from 'lit';

export class TvChannel extends LitElement {
  // defaults
  constructor() {
    super();
    this.title = '';
    this.presenter = '';
  }
  // convention I enjoy using to define the tag's name
  static get tag() {
    return 'tv-channel';
  }
  // LitElement convention so we update render() when values change
  static get properties() {
    return {
      title: { type: String },
      presenter: { type: String },
    };
  }
  // LitElement convention for applying styles JUST to our element
  static get styles() {
    return css`
      :host {
        display: inline-flex;
      }

      .course-topic {
        display: flex;
        flex-direction: column;
        padding: 8px;
        background-color: #d3d3d3;
        margin-bottom: 10px;
        line-height: 19px;
        border-radius: 8px;
        font-size: 1.5vw;
        max-width: 200px;
        width: auto;
      }
        
   h3, h4 {
margin: 10px;
margin-left: 5px;
text-align: center;
    }






     

    `;
  }
  // LitElement rendering template of your element
  render() {
    return html`
      <div class="course-topic">
        <h3>${this.title}</h3>
        <h4>${this.presenter}</h4>
        <slot></slot>
      </div>  
      
      `;
  }
}

// tell the browser about our tag and class it should run when it sees it
customElements.define(TvChannel.tag, TvChannel);
