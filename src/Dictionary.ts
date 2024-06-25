class Dictionary {
    private engToRo: Map<string, string>;
    private roToEng: Map<string, string>;
  
    constructor() {
      this.engToRo = new Map();
      this.roToEng = new Map();
      this.initializeTranslations();
    }
  
    private initializeTranslations() {
      this.addTranslation("Login", "Autentificare");
      this.addTranslation("Coffee & other unique sensations", "Cafea și alte senzații nemaiîntâlnite");
      this.addTranslation("Le Coupage", "Le Coupage");
      this.addTranslation("+373", "+373");
      this.addTranslation("68720841", "68720841");
    }
  
    addTranslation(english: string, romanian: string) {
      this.engToRo.set(english, romanian);
      this.roToEng.set(romanian, english);
    }
  
    translateToRomanian(english: string): string | undefined {
      return this.engToRo.get(english);
    }
  
    translateToEnglish(romanian: string): string | undefined {
      return this.roToEng.get(romanian);
    }
  }
  
  const globalDictionary = new Dictionary();
  export default globalDictionary;
  