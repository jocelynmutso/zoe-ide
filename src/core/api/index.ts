declare namespace API {

  interface Site {
    markdowns: Record<string, Markdown>,
    paths: Record<string, Path>
  }

  interface Markdown {
    id: string,
    created: string,
    modified: string,
    locale: string,
    content: string,
  }

  interface Path {
    id: string,
    parentId?: string,
    name: string,
    order: number,
    markdowns: string[],
  }

  type Releases = Release[];

  interface Release {
    id: string,
    name: string,
    created: string,
    note?: string
  }

  type Links = Link[];

  interface Link {
    path: string,
    type: string,
    value: string,
    locale: string,
    description: string
  }
}

namespace API {

  export const createSite = (): Site => {
    const markdowns = {
      "00M": { id: '00M', created: "", modified: "", locale: "FI", content: "# content stuff here" },
      "01M": { id: '01M', created: "", modified: "", locale: "EN", content: "# content stuff here" },
      "02M": { id: '02M', created: "", modified: "", locale: "SV", content: "# content stuff here" },
    };
    const paths = {
      "000": { id: "000", name: "Residency", order: 0, markdowns: ["00M", "01M", "02M"] },
      "001": { id: "001", name: "Healthcare", order: 0, markdowns: ["00M", "01M", "02M"] },
      "002": { id: "002", name: "Business", order: 0, markdowns: ["00M", "01M", "02M"] },

    };

    return {
      markdowns, paths
    };
  }

  export const createReleases = (): Releases => {

    return [
      { id: '1ttg4r4', name: 'LATEST', created: '29 August, 2021' },
      { id: '234883d', name: 'v3.0', created: '10 August, 2021', note: 'added topic "Business" and deleted "Entrepreneurship"' },
      { id: '3355trh', name: 'v2.5', created: '18 July, 2021', note: '' },
      { id: 'iu7800g', name: 'v2.0', created: '14 June, 2021', note: 'renamed Healthcare to Health Services' },
      { id: '21345tf', name: 'v1.2', created: '12 June, 2021', note: 'modified residency/fi.md' },
      { id: '4433ff4', name: 'v1.1', created: '5 June, 2021', note: 'modified residency/en.md' },
      { id: '7759uy5', name: 'v1.0', created: '3 June, 2021', note: 'added initial content' }
    ];

  }

  export const createLinks = (): Links => {

    return [
      { type: 'dialob',   value: 'General Message',         description: 'Lähetä viesti',   path: '', locale: 'fi' },
      { type: 'dialob',   value: 'General Message',         description: 'Send a message',  path: '', locale: 'en' },
      { type: 'internal', value: '',                        description: 'Ajankohtaista tietoa koronavirukseen liittyen', path: 'https://www.sipoo.fi/koronavirus/', locale: 'fi' },
      { type: 'external', value: 'Hospital',                description: 'Hospital',        path: 'http://www.hospital.com', locale: 'en' },
      { type: 'phone',    value: '+358 9 23531',            description: 'Municipality phone central', path: 'index', locale: 'fi' },
      { type: 'dialob',   value: 'Inforeq Social services', description: 'Tietopyyntö - sosiaalipalvelut', path: 'social-services', locale: 'fi' },
      { type: 'dialob',   value: 'General Message',         description: 'Lähetä viesti',   path: 'leisure-time-and-youth', locale: 'fi' },
      { type: 'phone',    value: 'residence',               description: 'Lähetä viesti',   path: 'residence', locale: 'sv' },
      { type: 'dialob',   value: 'General Message',         description: 'Lähetä viesti',   path: '', locale: 'fi' },
      { type: 'dialob',   value: 'General Message',         description: 'Lähetä viesti',   path: '', locale: 'fi' },

    ];

  }



}

export default API;