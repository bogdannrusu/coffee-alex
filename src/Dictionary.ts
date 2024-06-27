class Dictionary {
    private engToRo: Map<string, string>;
    private roToEng: Map<string, string>;
  
    constructor() {
      this.engToRo = new Map();
      this.roToEng = new Map();
      this.initializeTranslations();
    }
    //Aici fac translate la contentul din Main
    private initializeTranslations() {
      this.addTranslation("Login", "Autentificare");
      this.addTranslation("Home", "Acasa");
      this.addTranslation("Products", "Produse");
      this.addTranslation("Trainings", "Traininguri");
      this.addTranslation("About", "Despre");
      this.addTranslation("Contacts", "Contacte");
      this.addTranslation("Coffee & other unique sensations", "Cafea și alte senzații nemaiîntâlnite");
      this.addTranslation("Le Coupage", "Le Coupage");
      this.addTranslation("Superior quality equipment", "Echipamente de calitate superioara");
      this.addTranslation("View Products", "Vezi Produsele");
      this.addTranslation("and coffee supplements", "și suplimente de cafea");
      this.addTranslation("Look at the products", "Vezi produsele noastre");
      this.addTranslation("The most complete cafe equipment store", "Cel mai complet magazin de echipamente pentru cafenele");
      this.addTranslation("View Products", "Vezi Produsele");
      this.addTranslation("View Products", "Vezi Produsele");
      this.addTranslation("Categories", "Categorii");
      this.addTranslation("We chose the best of the best!", "Am ales cei mai buni dintre cei mai buni!");
      this.addTranslation("Special Offers", "Oferte Speciale");
      this.addTranslation("View Orders", "Vedeti Comenzile");
      this.addTranslation("", "");
      this.addTranslation("", "");
      this.addTranslation("", "");
      this.addTranslation("", "");
      this.addTranslation("", "");
      this.addTranslation("", "");
      this.addTranslation("", "");
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
  