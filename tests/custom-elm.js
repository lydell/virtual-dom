
(function () {
  const sayAttribute = "say";
  const id = "custom-elm";

  class CustomElm extends HTMLElement {
    static get observedAttributes() {
      return [sayAttribute];
    }

    // Say attribute
    get say() {
      let _options = this.getAttribute(sayAttribute);
      return _options;
    }

    set say(newValue) {
      this.setAttribute(sayAttribute, newValue);
    }


    constructor() {
      super();
    }

    connectedCallback() {
      this.innerHTML = `<div id="${id}" data-elm></div>`;

      var flags = { say : this.say
      };

      var app = Elm.Custom.init({
        flags: flags,
        node: document.getElementById(id),
      });
      this.app = app;

      var element = this;
    }
  }
  window.customElements.define(id, CustomElm);
})();
