import Selector from '../src/js/ElementsDisplay/Selector';

/**
 * @jest-environment jsdom
 */
it('should create a option element for a select input', () => 
{
      const optionElement = Selector.createSelectorOption('Test Option');
      expect(optionElement).toBeInstanceOf(HTMLOptionElement);
      expect(optionElement.value).toBe('Test Option');
});

test('it should clean a select element and create a option title', () => 
{
  const select = document.createElement('select');
  const titre1 = document.createElement('option');
  const titre2 = document.createElement('option');
  const titre3 = document.createElement('option');
  select.appendChild(titre1);
  select.appendChild(titre2);
  select.appendChild(titre3);

  expect(select.length).toBe(3);

  const newSelector = Selector.cleanSelect(select);

  expect(newSelector.length).toBe(1);

});

it('should had a array of option in a select element', () => 
{
  const select = document.createElement('select');
  const option = new Object();  

  const group = [option, option, option, option];
  const groupOptions = [group, group, group, group];

  const newSelector = Selector.displayOptionsListCountry(select, groupOptions);
  
  expect(newSelector).toBeInstanceOf(HTMLSelectElement);
  if (newSelector != null) {
      expect(newSelector.firstChild).toBeInstanceOf(HTMLOptionElement);
      expect(newSelector.length).toBe(4);
  }
});


it('should had a array of option in a select element if country is correct', () => 
{
  const select = document.createElement('select');  
  
  const option1 = new Object();
  const option2 = new Object();

  option1['country'] = "Good";
  option2['country'] = "Bad";
  

  const group = [option1, option2, option1, option1];
  const newSelector = Selector.displayOptionsListCity(select, group, "Good");

  expect(newSelector).toBeInstanceOf(HTMLSelectElement);
  if (newSelector != null) {
    expect(newSelector.firstChild).toBeInstanceOf(HTMLOptionElement);
    // Expect 4 : 3 good options + 1 in the cleanSelect method
    expect(newSelector.length).toBe(4);
  }
});

