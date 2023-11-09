// import stuff
import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import "./tv-channel.js";



export class TvApp extends LitElement {
  // defaults
  constructor() {
    super();
    this.name = 'James';
    this.source = new URL('../assets/channels.json', import.meta.url).href;
    this.listings = [];

  }
  // convention I enjoy using to define the tag's name
  static get tag() {
    return 'tv-app';
  }
  // LitElement convention so we update render() when values change
  static get properties() {
    return {
      name: { type: String },
      source: { type: String },
      listings: { type: Array },
      
    };
  }
  // LitElement convention for applying styles JUST to our element
  static get styles() {
    return [
      css`
      :host {
        display: block;
        margin: 16px;
        padding: 16px;
      }

  .container {
  display: flex;
  justify-content: space-between; 
}

.course-topics {
  text-align: left;
  padding: 10px;
  margin-right: 1px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: auto;
  margin-bottom: 10px;
  border: 1px solid black;
}

.content-box {
  font-size: 1.3em;
  border: 1px solid black;
  width: 100%;
  margin-bottom: 10px;
  position: relative;
}

.active-page {
  height: 10%;
  outline: 1px solid black;
}

.prev-page {
        height: 50px;
        width: 90px;
        outline: 1px solid black;
        position: absolute;
        bottom: 10px;
        left: 10px;
}
.next-page {
        height: 50px;
        width: 90px;
        outline: 1px solid black;
        position: absolute;
        bottom: 10px;
        right: 10px;
}

      `
    ];
  }
  // LitElement rendering template of your elemen
  

  render() {
    return html`
      <div class="container">
        <div class="course-topics">
          ${
            this.listings.map(
              (item) => html`
                <tv-channel 
                  title="${item.title}"
                  presenter="${item.metadata.author}"
                  @click="${this.itemClick}"
                >
                </tv-channel>
              `
            )
          }
        </div> <!-- end course-topics -->

        <div class="content-box">
          
          <div class="active-page">
        </div><!-- end active page -->
        

        <div class="prev-page">
        </div><!-- end prev-page -->

        <div class="next-page">
        </div><!-- end next-page -->

      </div> <!-- end content-box -->
      </div><!-- end container -->

  
    `;
  }


  

  

  // LitElement life cycle for when any property changes
  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    changedProperties.forEach((oldValue, propName) => {
      if (propName === "source" && this[propName]) {
        this.updateSourceData(this[propName]);
      }
    });
  }

  async updateSourceData(source) {
    await fetch(source).then((resp) => resp.ok ? resp.json() : []).then((responseData) => {
      if (responseData.status === 200 && responseData.data.items && responseData.data.items.length > 0) {
        this.listings = [...responseData.data.items];
      }
    });
  }
}
// tell the browser about our tag and class it should run when it sees it
customElements.define(TvApp.tag, TvApp);
