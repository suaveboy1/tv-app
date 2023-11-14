// import stuff
import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import "./tv-channel.js";



export class TvApp extends LitElement {

  constructor() {
    super();
    this.name = 'James';
    this.source = new URL('/assets/channels.json', import.meta.url).href;
    this.listings = [];
    this.selectedCourse = null;
    this.currentPage = 0;
  }


  static get tag() {
    return 'tv-app';
  }


  static get properties() {
    return {
      name: { type: String },
      source: { type: String },
      listings: { type: Array },
      selectedCourse: { type: Object },
      currentPage: { type: Number },
    };
  }


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
          left: 5px;
        }

        .next-page {
          height: 50px;
          width: 90px;
          outline: 1px solid black;
          position: absolute;
          bottom: 10px;
          right: 10px;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="container">
        <div class="course-topics">
          ${this.listings.map(
            (item) => html`
              <tv-channel
                title="${item.title}"
                presenter="${item.metadata.author}"
                @click="${() => this.handleCourseClick(item)}"
              ></tv-channel>
            `
          )}
        </div>

        <div class="content-box">
          ${this.selectedCourse
            ? html`
                <h3>${this.selectedCourse.title}</h3>
                <p>${this.selectedCourse.description}</p>
                <a href="${this.selectedCourse.metadata.source}" target="_blank">Watch video</a>
              `
            : ''}
     
        </div>
        <div class="prev-page" @click="${this.handlePrevPageClick}">Previous Page</div>
        <div class="next-page" @click="${this.handleNextPageClick}">Next Page</div>
      
      </div>
    `;
  }

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'source' && this[propName]) {
        this.updateSourceData(this[propName]);
      }
    });
  }


 async updateSourceData(source) {
    await fetch(source)
      .then((resp) => (resp.ok ? resp.json() : null))
      .then((responseData) => {
      if (
        responseData &&
          responseData.status === 200 &&
          responseData.data &&
          responseData.data.items &&
          responseData.data.items.length > 0
        ) {
          this.listings = [...responseData.data.items];
          this.selectedCourse = this.listings[0]; 
        }
      });
  }


  handleCourseClick(course) {
    this.selectedCourse = course;
    this.currentPage = 0; 
  }

  
  handlePrevPageClick() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  handleNextPageClick() {
    if (this.currentPage < this.listings.length - 1) {
      this.currentPage++;
    }
  }
}

customElements.define(TvApp.tag, TvApp);