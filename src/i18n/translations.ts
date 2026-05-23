export type Language = 'he' | 'en' | 'es'

export const translations = {
  he: {
    // App
    appName: 'מנגל מחשבון',
    appTagline: 'תכנן את המנגל המושלם שלך',

    // Login
    loginTitle: 'ברוכים הבאים',
    loginSubtitle: 'התחבר כדי לתכנן את המנגל שלך',
    loginButton: 'התחבר עם Google',
    loginError: 'שגיאה בהתחברות. נסה שנית.',

    // Header
    logout: 'התנתק',
    savedLists: 'רשימות שמורות',
    newList: 'רשימה חדשה',

    // Language names
    langHe: 'עברית',
    langEn: 'English',
    langEs: 'Español',

    // Guest Form
    guestFormTitle: 'פירוט אורחים',
    adults: 'מבוגרים',
    adultsDesc: 'מעל גיל 12',
    kids: 'ילדים',
    kidsDesc: 'עד גיל 12',
    vegetarians: 'צמחונים',
    vegetariansDesc: 'מתוך הסה״כ',
    vegans: 'טבעונים',
    vegansDesc: 'מתוך הסה״כ',
    allergies: 'אלרגיות',
    allergiesDesc: 'אורחים עם אלרגיות מזון',
    addAllergyGuest: 'הוסף אורח עם אלרגיה',
    allergyNote: 'פרט את האלרגיה...',
    removeGuest: 'הסר',
    guestSummary: 'סה״כ: {adults} מבוגרים, {kids} ילדים, {vegetarians} צמחונים, {vegans} טבעונים, {allergy} עם אלרגיות',

    // Venue
    outdoor: 'חוץ 🌳',
    indoor: 'בית 🏠',

    // Meat portions
    portionsTitle: 'כמויות בשר לאורח',
    portionsShow: 'התאם כמויות בשר',
    portionsHide: 'הסתר',
    chickenPerAdult: 'פרגיות למבוגר',
    chickenPerKid: 'פרגיות לילד',
    steakPerAdult: 'סטייק למבוגר (גרם)',
    steakPerKid: 'סטייק לילד (גרם)',

    // Drink portions
    drinkPortionsTitle: 'כמויות שתייה לאורח',
    drinkPortionsShow: 'התאם כמויות שתייה',
    waterPerPerson: 'מים לאדם (ליטר)',
    softDrinksPerPerson: 'שתייה קלה לאדם (ליטר)',
    beerPerAdult: 'בירה למבוגר (בקבוקים)',
    winePerAdult: 'יין למבוגר (בקבוקים)',
    spiritsPerAdult: 'חריפים למבוגר (בקבוקים)',

    // Validation
    errorMinGuests: 'יש להזין לפחות אורח אחד',
    errorMaxGuests: 'מקסימום 200 אורחים',
    errorVegExceedTotal: 'צמחונים + טבעונים לא יכולים לעלות על סה״כ המבוגרים + ילדים',
    errorNegative: 'אין להזין מספר שלילי',

    // Calculate button
    calculate: 'חשב רשימת קניות',
    recalculate: 'חשב מחדש',

    // Shopping List
    shoppingListTitle: 'רשימת קניות',

    // Categories
    catMeat: '🍖 בשר',
    catSides: '🥗 ירקות וסלטים',
    catVeggie: '🌱 צמחוני / טבעוני',
    catDrinks: '🍺 שתייה',
    catEquipment: '🔥 ציוד',
    catAllergy: '⚠️ אורחים עם אלרגיות',

    // Items - Meat
    chicken: 'פרגיות',
    steak: 'סטייק',

    // Items - Sides
    salads: 'סלטים',
    hummus: 'חומוס',
    pitas: 'פיתות',

    // Items - Veggie
    halloumi: 'גבינת חלומי על האש',
    veggieSkewers: 'שיפודי ירקות',
    tofu: 'טופו על האש',
    corn: 'תירס',

    // Items - Drinks
    water: 'מים',
    softDrinks: 'שתייה קלה',
    beer: 'בירה',
    wine: 'יין',
    spirits: 'וויסקי / אוזו',

    // Items - Equipment
    charcoal: 'פחמים',
    lighterFluid: 'נוזל הדלקה',
    plates: 'צלחות חד פעמיות',
    cutlery: 'כלים חד פעמיים',
    napkins: 'מפיות',

    // Units
    unitPieces: "יח'",
    unitGrams: 'גרם',
    unitKg: 'ק״ג',
    unitLiters: 'ליטר',
    unitBottles: 'בקבוקים',
    unitSets: 'סטים',

    // List actions
    save: 'שמור רשימה',
    share: 'שתף',
    print: 'הדפס',
    copyLink: 'העתק קישור',
    linkCopied: 'הקישור הועתק!',

    // Item actions
    resetItem: 'אפס לחישוב',
    markPurchased: 'סמן כנרכש',

    // Allergy section
    allergyTitle: 'אורחים עם אלרגיות',
    allergyReminder: 'יש לבדוק ידנית מה מתאים לאורח זה',
    allergyGuest: 'אורח',

    // Save modal
    saveModalTitle: 'שמור רשימה',
    listName: 'שם הרשימה',
    listNamePlaceholder: 'לדוגמה: מנגל יום שישי',
    saveConfirm: 'שמור',
    cancel: 'ביטול',

    // Saved lists
    savedListsTitle: 'רשימות שמורות',
    noSavedLists: 'אין רשימות שמורות עדיין',
    loadList: 'טען',
    deleteList: 'מחק',
    listSaved: 'הרשימה נשמרה בהצלחה!',
    listSaveFailed: 'שגיאה בשמירת הרשימה',
    confirmDelete: 'האם למחוק את הרשימה?',

    // Share
    shareTitle: 'רשימת קניות משותפת',
    sharedBy: 'שותף על ידי',
    shareReadOnly: 'רשימה זו היא לצפייה בלבד',
    shareSuccess: 'הרשימה נשמרה! שתף אותה:',
    shareViaWhatsApp: 'שלח בוואטסאפ',
    shareViaEmail: 'שלח במייל',
    shareMessageText: 'הנה רשימת הקניות למנגל שלנו 🔥',

    // Loading / errors
    loading: 'טוען...',
    errorGeneric: 'אירעה שגיאה. נסה שנית.',

    // Misc
    close: 'סגור',
    createdAt: 'נוצר',
  },

  en: {
    appName: 'BBQ Calculator',
    appTagline: 'Plan your perfect BBQ',

    loginTitle: 'Welcome',
    loginSubtitle: 'Sign in to plan your BBQ',
    loginButton: 'Sign in with Google',
    loginError: 'Sign in error. Please try again.',

    logout: 'Sign Out',
    savedLists: 'Saved Lists',
    newList: 'New List',

    langHe: 'עברית',
    langEn: 'English',
    langEs: 'Español',

    guestFormTitle: 'Guest Breakdown',
    adults: 'Adults',
    adultsDesc: 'Over 12',
    kids: 'Kids',
    kidsDesc: 'Under 12',
    vegetarians: 'Vegetarians',
    vegetariansDesc: 'Subset of total',
    vegans: 'Vegans',
    vegansDesc: 'Subset of total',
    allergies: 'Allergies',
    allergiesDesc: 'Guests with food allergies',
    addAllergyGuest: 'Add allergy guest',
    allergyNote: 'Describe allergy...',
    removeGuest: 'Remove',
    guestSummary:
      'Total: {adults} adults, {kids} kids, {vegetarians} vegetarians, {vegans} vegans, {allergy} with allergies',

    // Venue
    outdoor: 'Outdoor 🌳',
    indoor: 'Indoor 🏠',

    // Meat portions
    portionsTitle: 'Meat per guest',
    portionsShow: 'Customize meat portions',
    portionsHide: 'Hide',
    chickenPerAdult: 'Chicken per adult',
    chickenPerKid: 'Chicken per kid',
    steakPerAdult: 'Steak per adult (g)',
    steakPerKid: 'Steak per kid (g)',

    // Drink portions
    drinkPortionsTitle: 'Drinks per guest',
    drinkPortionsShow: 'Customize drinks',
    waterPerPerson: 'Water per person (L)',
    softDrinksPerPerson: 'Soft drinks per person (L)',
    beerPerAdult: 'Beer per adult (bottles)',
    winePerAdult: 'Wine per adult (bottles)',
    spiritsPerAdult: 'Spirits per adult (bottles)',

    errorMinGuests: 'Please enter at least 1 guest',
    errorMaxGuests: 'Maximum 200 guests',
    errorVegExceedTotal: 'Vegetarians + Vegans cannot exceed total Adults + Kids',
    errorNegative: 'Please enter a non-negative number',

    calculate: 'Calculate Shopping List',
    recalculate: 'Recalculate',

    shoppingListTitle: 'Shopping List',

    catMeat: '🍖 Meat',
    catSides: '🥗 Sides & Salads',
    catVeggie: '🌱 Vegetarian / Vegan',
    catDrinks: '🍺 Drinks',
    catEquipment: '🔥 Equipment',
    catAllergy: '⚠️ Allergy Guests',

    chicken: 'Chicken Thighs',
    steak: 'Steak',

    salads: 'Salads',
    hummus: 'Hummus',
    pitas: 'Pitas',

    halloumi: 'Grilled Halloumi',
    veggieSkewers: 'Veggie Skewers',
    tofu: 'Grilled Tofu',
    corn: 'Corn',

    water: 'Water',
    softDrinks: 'Soft Drinks',
    beer: 'Beer',
    wine: 'Wine',
    spirits: 'Whiskey / Ouzo',

    charcoal: 'Charcoal',
    lighterFluid: 'Lighter Fluid',
    plates: 'Disposable Plates',
    cutlery: 'Disposable Cutlery',
    napkins: 'Napkins',

    unitPieces: 'pcs',
    unitGrams: 'g',
    unitKg: 'kg',
    unitLiters: 'L',
    unitBottles: 'bottles',
    unitSets: 'sets',

    save: 'Save List',
    share: 'Share',
    print: 'Print',
    copyLink: 'Copy Link',
    linkCopied: 'Link copied!',

    resetItem: 'Reset to calculated',
    markPurchased: 'Mark as purchased',

    allergyTitle: 'Allergy Guests',
    allergyReminder: 'Check manually what is suitable for this guest',
    allergyGuest: 'Guest',

    saveModalTitle: 'Save List',
    listName: 'List Name',
    listNamePlaceholder: 'e.g. Friday BBQ',
    saveConfirm: 'Save',
    cancel: 'Cancel',

    savedListsTitle: 'Saved Lists',
    noSavedLists: 'No saved lists yet',
    loadList: 'Load',
    deleteList: 'Delete',
    listSaved: 'List saved successfully!',
    listSaveFailed: 'Failed to save list',
    confirmDelete: 'Delete this list?',

    shareTitle: 'Shared Shopping List',
    sharedBy: 'Shared by',
    shareReadOnly: 'This list is read-only',
    shareSuccess: 'List saved! Share it:',
    shareViaWhatsApp: 'Send via WhatsApp',
    shareViaEmail: 'Send via Email',
    shareMessageText: 'Here is our BBQ shopping list 🔥',

    loading: 'Loading...',
    errorGeneric: 'An error occurred. Please try again.',

    close: 'Close',
    createdAt: 'Created',
  },

  es: {
    appName: 'Calculadora BBQ',
    appTagline: 'Planifica tu BBQ perfecto',

    loginTitle: 'Bienvenido',
    loginSubtitle: 'Inicia sesión para planificar tu BBQ',
    loginButton: 'Iniciar sesión con Google',
    loginError: 'Error al iniciar sesión. Inténtalo de nuevo.',

    logout: 'Cerrar sesión',
    savedLists: 'Listas guardadas',
    newList: 'Nueva lista',

    langHe: 'עברית',
    langEn: 'English',
    langEs: 'Español',

    guestFormTitle: 'Tipos de invitados',
    adults: 'Adultos',
    adultsDesc: 'Mayores de 12',
    kids: 'Niños',
    kidsDesc: 'Menores de 12',
    vegetarians: 'Vegetarianos',
    vegetariansDesc: 'Del total',
    vegans: 'Veganos',
    vegansDesc: 'Del total',
    allergies: 'Alergias',
    allergiesDesc: 'Invitados con alergias alimentarias',
    addAllergyGuest: 'Agregar invitado con alergia',
    allergyNote: 'Describir alergia...',
    removeGuest: 'Eliminar',
    guestSummary:
      'Total: {adults} adultos, {kids} niños, {vegetarians} vegetarianos, {vegans} veganos, {allergy} con alergias',

    // Venue
    outdoor: 'Exterior 🌳',
    indoor: 'Interior 🏠',

    // Meat portions
    portionsTitle: 'Carne por invitado',
    portionsShow: 'Personalizar porciones de carne',
    portionsHide: 'Ocultar',
    chickenPerAdult: 'Pollo por adulto',
    chickenPerKid: 'Pollo por niño',
    steakPerAdult: 'Filete por adulto (g)',
    steakPerKid: 'Filete por niño (g)',

    // Drink portions
    drinkPortionsTitle: 'Bebidas por invitado',
    drinkPortionsShow: 'Personalizar bebidas',
    waterPerPerson: 'Agua por persona (L)',
    softDrinksPerPerson: 'Refrescos por persona (L)',
    beerPerAdult: 'Cerveza por adulto (botellas)',
    winePerAdult: 'Vino por adulto (botellas)',
    spiritsPerAdult: 'Spirits por adulto (botellas)',

    errorMinGuests: 'Por favor ingresa al menos 1 invitado',
    errorMaxGuests: 'Máximo 200 invitados',
    errorVegExceedTotal:
      'Vegetarianos + Veganos no pueden superar el total de Adultos + Niños',
    errorNegative: 'Por favor ingresa un número no negativo',

    calculate: 'Calcular lista de compras',
    recalculate: 'Recalcular',

    shoppingListTitle: 'Lista de compras',

    catMeat: '🍖 Carne',
    catSides: '🥗 Guarniciones y ensaladas',
    catVeggie: '🌱 Vegetariano / Vegano',
    catDrinks: '🍺 Bebidas',
    catEquipment: '🔥 Equipamiento',
    catAllergy: '⚠️ Invitados con alergias',

    chicken: 'Muslos de pollo',
    steak: 'Filete',

    salads: 'Ensaladas',
    hummus: 'Hummus',
    pitas: 'Pitas',

    halloumi: 'Halloumi a la parrilla',
    veggieSkewers: 'Pinchos de verduras',
    tofu: 'Tofu a la parrilla',
    corn: 'Maíz',

    water: 'Agua',
    softDrinks: 'Refrescos',
    beer: 'Cerveza',
    wine: 'Vino',
    spirits: 'Whisky / Ouzo',

    charcoal: 'Carbón',
    lighterFluid: 'Líquido encendedor',
    plates: 'Platos desechables',
    cutlery: 'Cubiertos desechables',
    napkins: 'Servilletas',

    unitPieces: 'pzs',
    unitGrams: 'g',
    unitKg: 'kg',
    unitLiters: 'L',
    unitBottles: 'botellas',
    unitSets: 'juegos',

    save: 'Guardar lista',
    share: 'Compartir',
    print: 'Imprimir',
    copyLink: 'Copiar enlace',
    linkCopied: '¡Enlace copiado!',

    resetItem: 'Restablecer al calculado',
    markPurchased: 'Marcar como comprado',

    allergyTitle: 'Invitados con alergias',
    allergyReminder: 'Verifica manualmente qué es adecuado para este invitado',
    allergyGuest: 'Invitado',

    saveModalTitle: 'Guardar lista',
    listName: 'Nombre de la lista',
    listNamePlaceholder: 'ej. BBQ del viernes',
    saveConfirm: 'Guardar',
    cancel: 'Cancelar',

    savedListsTitle: 'Listas guardadas',
    noSavedLists: 'No hay listas guardadas aún',
    loadList: 'Cargar',
    deleteList: 'Eliminar',
    listSaved: '¡Lista guardada exitosamente!',
    listSaveFailed: 'Error al guardar la lista',
    confirmDelete: '¿Eliminar esta lista?',

    shareTitle: 'Lista de compras compartida',
    sharedBy: 'Compartido por',
    shareReadOnly: 'Esta lista es de solo lectura',
    shareSuccess: '¡Lista guardada! Compártela:',
    shareViaWhatsApp: 'Enviar por WhatsApp',
    shareViaEmail: 'Enviar por Email',
    shareMessageText: 'Aquí está nuestra lista de compras para el BBQ 🔥',

    loading: 'Cargando...',
    errorGeneric: 'Ocurrió un error. Inténtalo de nuevo.',

    close: 'Cerrar',
    createdAt: 'Creado',
  },
} as const

export type TranslationKey = keyof (typeof translations)['he']
