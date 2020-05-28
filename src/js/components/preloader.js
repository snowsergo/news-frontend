export default class Preloader {
  constructor() {}

  renderLoading(isLoading) {
    const loadingSection = document.querySelector(".preloader");

    const resultSection = document.querySelector(".results");
    if (isLoading) {
      loadingSection.classList.add("preloader_is-opened");
    } else {
      loadingSection.classList.remove("preloader_is-opened");
    }
  }

  nothingFound(noresults) {
    const noResultsSection = document.querySelector(".no-results");
    if (noresults) {
      noResultsSection.classList.add("no-results_is-opened");
    } else {
      noResultsSection.classList.remove("no-results_is-opened");
    }
  }

  showResults(results) {
    const resultSection = document.querySelector(".results");
    if (results) {
      resultSection.classList.add("results_is-opened");
    } else {
      resultSection.classList.remove("results_is-opened");
    }
  }

  renderButton(articlesLeft) {
    const resultsButton = document.querySelector(".results__button");
    if (articlesLeft) {
      resultsButton.classList.add("results__button_is-opened");
    } else {
      resultsButton.classList.remove("results__button_is-opened");
    }
  }
}
