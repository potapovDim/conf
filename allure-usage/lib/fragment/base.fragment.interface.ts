import {ElementFinder} from 'protractor';
import {waiter} from '../element_utils'
import {step} from '../report'

class BaseFragmentInterface {
  private root: ElementFinder;
  private name: string;

  constructor(elementRoor: ElementFinder, name) {
    this.root = elementRoor
    this.name = name ? name : BaseFragmentInterface.name;
  }

  @step((name) => `${name} execute click`)
  async click(clickObj?: object) {
    if (!clickObj) {
      throw new Error(`${this.name} click argument should be an object`);
    }
    await this.waitVisible();
    for (const key of Object.keys(clickObj)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key}`);
      }
      await this[key].click(clickObj[key]);
    }
  }

  @step((name) => `${name} execute click`)
  async get(getObj: object) {
    if (!getObj) {
      throw new Error(`${this.name} get argument should be an object`);
    }
    await this.waitVisible();
    const tempGet = {...getObj};
    for (const key of Object.keys(tempGet)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key}`);
      }
      tempGet[key] = await this[key].get(tempGet[key]);
    }

    return tempGet;
  }

  @step((name) => `${name} execute click`)
  async sendKeys(sendObj: object) {
    if (!sendObj) {
      throw new Error(`${this.name} send keys argument should be an object`);
    }

    await this.waitVisible();

    for (const key of Object.keys(sendObj)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key}`);
      }
      await this[key].sendKeys(sendObj[key]);
    }
  }

  @step((name) => `${name} execute click`)
  async isDisplay(dispayObj) {
    if (dispayObj === null) {
      return (await this.root.isPresent()) && this.root.isDisplayed()
    }
    const tempDisplayed = {...dispayObj};
    for (const key of Object.keys(tempDisplayed)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key}`);
      }
      tempDisplayed[key] = await this[key].isDisplay(tempDisplayed[key]);
    }
    return tempDisplayed;
  }

  async waitVisible() {
    await waiter.waitForVisible(this);
  }


  initChild(childClass, elementSelector, ...args) {
    return new childClass(this.root.$(elementSelector), ...args);
  }
}

export {
  BaseFragmentInterface
}