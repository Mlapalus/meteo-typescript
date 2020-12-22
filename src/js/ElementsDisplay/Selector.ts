export default class Selector
{

  static createSelectorOption(value: string): HTMLOptionElement
  {
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.innerHTML = value;
    return optionElement;
  };

  static cleanSelect(selectElement: HTMLSelectElement | null): HTMLSelectElement
  { 
    if (selectElement != null) {
      while (selectElement.options.length > 0) 
      { 
        selectElement.remove(0); 
      }
    } else {
      selectElement = document.createElement('select');
    }

    const title = "Liste des villes disponibles";
    const optionMenu = this.createSelectorOption(title);
    optionMenu.selected = true;
    optionMenu.className = "options";
    selectElement.add(optionMenu);
    return selectElement;
  };

  static displayOptionsListCountry(select: HTMLSelectElement | null, options: Array<Object>): HTMLSelectElement | null
  {
    if (select != null) {
        options.map( option => {
          select.appendChild(this.createSelectorOption(option[1]["Name"]));
        });
    }
    return select;                
  };

  static displayOptionsListCity(select: HTMLSelectElement | null, options: Array<Object>, country: string): HTMLSelectElement | null
  {
    select = this.cleanSelect(select);
    options.map( (option) => 
                { 
                  if(option['country'] == country) {
                      select?.appendChild(this.createSelectorOption(option["name"]));
                  }
                }
                )
    return select;
  };

};
