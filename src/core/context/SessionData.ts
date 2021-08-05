import Ide from './ide';
import { API } from '../deps';

class SessionData implements Ide.Session {
  private _site: API.CMS.Site;
  private _pages: Record<API.CMS.PageId, Ide.PageUpdate>;

  constructor(props: {
    site?: API.CMS.Site,
    pages?: Record<API.CMS.PageId, Ide.PageUpdate>
  }) {

    this._site = props.site ? props.site : { name: "", contentType: "OK", releases: {}, articles: {}, links: {}, locales: {}, pages: {}, workflows: {} };
    this._pages = props.pages ? props.pages : {};
  }

  get site() {
    return this._site;
  }
  get pages() {
    return this._pages;
  }

  withSite(site: API.CMS.Site) {
    return new SessionData({ site: site });
  }
  withoutPages(pageIds: API.CMS.PageId[]): Ide.Session {
    const pages = {};
    for(const page of Object.values(this._pages)) {
      if(pageIds.includes(page.origin.id)) {
        continue;
      }
      pages[page.origin.id] = page;
    }
    return new SessionData({ site: this._site, pages });
  } 
  withPage(page: API.CMS.PageId): Ide.Session {
    if (this._pages[page]) {
      return this;
    }
    const pages = Object.assign({}, this._pages);
    const origin = this._site.pages[page];
    pages[page] = new ImmutablePageUpdate({origin, saved: true, value: origin.body.content});
    return new SessionData({ site: this._site, pages });
  }
  withPageValue(page: API.CMS.PageId, value: API.CMS.LocalisedContent): Ide.Session {
    const session = this.withPage(page);
    const pageUpdate = session.pages[page];

    const pages = Object.assign({}, session.pages);
    pages[page] = pageUpdate.withValue(value);    
    
    return new SessionData({ site: session.site, pages });
  }
}

class ImmutablePageUpdate implements Ide.PageUpdate {
  private _saved: boolean;
  private _origin: API.CMS.Page;
  private _value: API.CMS.LocalisedContent;

  constructor(props: {
    saved: boolean;
    origin: API.CMS.Page;
    value: API.CMS.LocalisedContent;
  }) {
    this._saved = props.saved;
    this._origin = props.origin;
    this._value = props.value;
  }
  
  get saved() {
    return this._saved;
  }
  get origin() {
    return this._origin;
  }
  get value() {
    return this._value;
  }
  withValue(value: API.CMS.LocalisedContent): Ide.PageUpdate {
    return new ImmutablePageUpdate({saved: false, origin: this._origin, value});
  }
}

class ImmutableTabData implements Ide.TabData {
  private _nav: Ide.Nav;

  constructor(props: { nav: Ide.Nav }) {
    this._nav = props.nav;
  }
  get nav() {
    return this._nav;
  }
  withNav(nav: Ide.Nav) {
    return new ImmutableTabData({ nav });
  }
}


export { SessionData, ImmutableTabData };
