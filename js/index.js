const baseColorInput = document.getElementById("base-color")
const schemeTypeSelect = document.getElementById("scheme-type")
const colorSchemeForm = document.getElementById("color-scheme-form")
const colorSchemeList = document.getElementById("color-scheme-list")


function getColorScheme(colorHex, schemeMode) {
  const URL = `https://www.thecolorapi.com/scheme?hex=${colorHex}&mode=${schemeMode}`

  fetch(URL)
    .then(res => res.json())
    .then(data => {
      const colorItemsHTML = data.colors.map(({ hex, image }) => {
        return `<li class="color-scheme__item">
                  <img src="${image.bare}" alt="Color swatch${hex.value}" class="color-scheme__swatch">
                  <span class="color-scheme__hex">${hex.value}</span>
                </li>`
      }).join("")

      colorSchemeList.innerHTML = colorItemsHTML
    })
}

function getFormValues() {
  let colorHex = baseColorInput.value.slice(1)
  let schemeMode = schemeTypeSelect.value
  return { colorHex, schemeMode }
}

function handleFormSubmit(e) {
  e.preventDefault()
  const { colorHex, schemeMode } = getFormValues()
  getColorScheme(colorHex, schemeMode)
}

document.addEventListener("DOMContentLoaded", handleFormSubmit)
colorSchemeForm.addEventListener("submit", handleFormSubmit)