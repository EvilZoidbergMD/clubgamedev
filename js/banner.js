
class Banner extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <div class="banner">
            <a href="index.html" class="banner-item">Home</a>
            <a href="installation.html" class="banner-item">Installation</a>
            <a href="coding.html" class="banner-item">Coding</a>
            <a href="art.html" class="banner-item">Art</a>
            <a href="coding.html" class="banner-item">Other</a>
        </div>
    `;
  }
}

customElements.define('banner-snippet', Banner);