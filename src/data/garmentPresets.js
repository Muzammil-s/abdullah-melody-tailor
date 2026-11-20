/**
 * S, M, L, XL Measurement Presets and Metric Hints for all 10 Garments
 * All measurements strictly in Inches (with 0.25" decimals)
 */

export const GARMENT_SIZE_PRESETS = {
  'shalwar-kameez': {
    S: {
      kameez: { length: 38.0, chest: 38.0, gap: 2.0, belly: 35.0, hip: 39.0, shoulder: 16.5, sleeves: 23.0, collar: 14.5 },
      shalwar: { length: 37.0, bottom: 8.0, width: 22.0, inside: 25.0 }
    },
    M: {
      kameez: { length: 40.5, chest: 41.0, gap: 2.5, belly: 38.0, hip: 42.0, shoulder: 17.5, sleeves: 24.5, collar: 15.5 },
      shalwar: { length: 39.0, bottom: 8.5, width: 24.0, inside: 27.0 }
    },
    L: {
      kameez: { length: 42.5, chest: 44.0, gap: 3.0, belly: 41.0, hip: 45.0, shoulder: 18.5, sleeves: 25.5, collar: 16.5 },
      shalwar: { length: 41.0, bottom: 9.0, width: 26.0, inside: 28.5 }
    },
    XL: {
      kameez: { length: 44.0, chest: 47.0, gap: 3.5, belly: 44.0, hip: 48.0, shoulder: 19.5, sleeves: 26.5, collar: 17.5 },
      shalwar: { length: 42.5, bottom: 9.5, width: 28.0, inside: 30.0 }
    }
  },

  'kurta-pajama': {
    S: {
      kurta: { length: 38.0, chest: 38.0, gap: 2.0, belly: 35.0, hip: 39.0, shoulder: 16.5, sleeves: 23.0, collar: 14.5 },
      pajama: { waist: 30.0, hip: 38.0, length: 38.0, inside: 26.0, thigh: 23.0, knee: 17.0, bottom: 15.0 }
    },
    M: {
      kurta: { length: 40.5, chest: 41.0, gap: 2.5, belly: 38.0, hip: 42.0, shoulder: 17.5, sleeves: 24.5, collar: 15.5 },
      pajama: { waist: 34.0, hip: 41.0, length: 40.0, inside: 28.0, thigh: 25.0, knee: 18.5, bottom: 16.0 }
    },
    L: {
      kurta: { length: 42.5, chest: 44.0, gap: 3.0, belly: 41.0, hip: 45.0, shoulder: 18.5, sleeves: 25.5, collar: 16.5 },
      pajama: { waist: 38.0, hip: 44.0, length: 41.5, inside: 29.5, thigh: 27.0, knee: 20.0, bottom: 17.0 }
    },
    XL: {
      kurta: { length: 44.0, chest: 47.0, gap: 3.5, belly: 44.0, hip: 48.0, shoulder: 19.5, sleeves: 26.5, collar: 17.5 },
      pajama: { waist: 42.0, hip: 47.0, length: 43.0, inside: 31.0, thigh: 29.0, knee: 21.5, bottom: 18.0 }
    }
  },

  'kurta-shalwar': {
    S: {
      kurta: { length: 38.0, chest: 38.0, gap: 2.0, belly: 35.0, hip: 39.0, shoulder: 16.5, sleeves: 23.0, collar: 14.5 },
      shalwar: { waist: 30.0, hip: 38.0, length: 37.0, inside: 25.0, thigh: 24.0, knee: 18.0, bottom: 8.0 }
    },
    M: {
      kurta: { length: 40.5, chest: 41.0, gap: 2.5, belly: 38.0, hip: 42.0, shoulder: 17.5, sleeves: 24.5, collar: 15.5 },
      shalwar: { waist: 34.0, hip: 41.0, length: 39.0, inside: 27.0, thigh: 26.0, knee: 19.5, bottom: 8.5 }
    },
    L: {
      kurta: { length: 42.5, chest: 44.0, gap: 3.0, belly: 41.0, hip: 45.0, shoulder: 18.5, sleeves: 25.5, collar: 16.5 },
      shalwar: { waist: 38.0, hip: 44.0, length: 41.0, inside: 28.5, thigh: 28.0, knee: 21.0, bottom: 9.0 }
    },
    XL: {
      kurta: { length: 44.0, chest: 47.0, gap: 3.5, belly: 44.0, hip: 48.0, shoulder: 19.5, sleeves: 26.5, collar: 17.5 },
      shalwar: { waist: 42.0, hip: 47.0, length: 42.5, inside: 30.0, thigh: 30.0, knee: 22.5, bottom: 9.5 }
    }
  },

  'dress-shirt': {
    S: { length: 29.0, chest: 38.0, gap: 2.0, belly: 34.0, hip: 38.0, shoulder: 17.0, sleeves: 24.0, collar: 14.5 },
    M: { length: 30.5, chest: 41.0, gap: 2.5, belly: 37.0, hip: 41.0, shoulder: 18.0, sleeves: 25.0, collar: 15.5 },
    L: { length: 32.0, chest: 44.0, gap: 3.0, belly: 40.0, hip: 44.0, shoulder: 19.0, sleeves: 26.0, collar: 16.5 },
    XL: { length: 33.0, chest: 47.0, gap: 3.5, belly: 43.0, hip: 47.0, shoulder: 20.0, sleeves: 27.0, collar: 17.5 }
  },

  'sleeping-suit': {
    S: {
      shirt: { length: 28.5, chest: 39.0, gap: 3.0, belly: 36.0, hip: 40.0, shoulder: 17.0, sleeves: 23.5, collar: 15.0 },
      pajama: { waist: 30.0, hip: 40.0, length: 38.0, inside: 26.5, thigh: 24.0, knee: 19.0, bottom: 16.5 }
    },
    M: {
      shirt: { length: 30.0, chest: 42.0, gap: 3.5, belly: 39.0, hip: 43.0, shoulder: 18.0, sleeves: 24.5, collar: 16.0 },
      pajama: { waist: 34.0, hip: 43.0, length: 40.0, inside: 28.0, thigh: 26.0, knee: 20.5, bottom: 17.5 }
    },
    L: {
      shirt: { length: 31.5, chest: 45.0, gap: 4.0, belly: 42.0, hip: 46.0, shoulder: 19.0, sleeves: 25.5, collar: 17.0 },
      pajama: { waist: 38.0, hip: 46.0, length: 41.5, inside: 29.5, thigh: 28.0, knee: 22.0, bottom: 18.5 }
    },
    XL: {
      shirt: { length: 33.0, chest: 48.0, gap: 4.5, belly: 45.0, hip: 49.0, shoulder: 20.0, sleeves: 26.5, collar: 18.0 },
      pajama: { waist: 42.0, hip: 49.0, length: 43.0, inside: 31.0, thigh: 30.0, knee: 23.5, bottom: 19.5 }
    }
  },

  'waistcoat': {
    S: { length: 25.0, chest: 37.0, gap: 1.5, belly: 33.5, hip: 38.0, shoulder: 15.5, sleeves: 0.0 },
    M: { length: 26.5, chest: 40.0, gap: 2.0, belly: 36.5, hip: 41.0, shoulder: 16.5, sleeves: 0.0 },
    L: { length: 28.0, chest: 43.0, gap: 2.5, belly: 39.5, hip: 44.0, shoulder: 17.5, sleeves: 0.0 },
    XL: { length: 29.5, chest: 46.0, gap: 3.0, belly: 42.5, hip: 47.0, shoulder: 18.5, sleeves: 0.0 }
  },

  'coat-pant': {
    S: {
      coat: { length: 28.5, chest: 38.0, gap: 2.0, belly: 34.0, hip: 38.0, shoulder: 17.0, sleeves: 24.0, collar: 15.0 },
      pant: { waist: 30.0, hip: 38.0, length: 39.0, inside: 28.5, thigh: 23.5, knee: 17.5, bottom: 14.5 }
    },
    M: {
      coat: { length: 30.0, chest: 41.0, gap: 2.5, belly: 37.0, hip: 41.0, shoulder: 18.0, sleeves: 25.0, collar: 16.0 },
      pant: { waist: 34.0, hip: 41.0, length: 41.0, inside: 30.0, thigh: 25.5, knee: 19.0, bottom: 15.5 }
    },
    L: {
      coat: { length: 31.5, chest: 44.0, gap: 3.0, belly: 40.0, hip: 44.0, shoulder: 19.0, sleeves: 26.0, collar: 17.0 },
      pant: { waist: 38.0, hip: 44.0, length: 42.5, inside: 31.5, thigh: 27.5, knee: 20.5, bottom: 16.5 }
    },
    XL: {
      coat: { length: 33.0, chest: 47.0, gap: 3.5, belly: 43.0, hip: 47.0, shoulder: 20.0, sleeves: 27.0, collar: 18.0 },
      pant: { waist: 42.0, hip: 47.0, length: 43.5, inside: 32.5, thigh: 29.5, knee: 22.0, bottom: 17.5 }
    }
  },

  'safari-suit': {
    S: {
      shirt: { length: 29.0, chest: 38.0, gap: 2.0, belly: 34.5, hip: 38.5, shoulder: 17.0, sleeves: 24.0, collar: 15.0 },
      pant: { waist: 30.0, hip: 38.0, length: 39.0, inside: 28.5, thigh: 23.5, knee: 17.5, bottom: 15.0 }
    },
    M: {
      shirt: { length: 30.5, chest: 41.0, gap: 2.5, belly: 37.5, hip: 41.5, shoulder: 18.0, sleeves: 25.0, collar: 16.0 },
      pant: { waist: 34.0, hip: 41.0, length: 41.0, inside: 30.0, thigh: 25.5, knee: 19.0, bottom: 16.0 }
    },
    L: {
      shirt: { length: 32.0, chest: 44.0, gap: 3.0, belly: 40.5, hip: 44.5, shoulder: 19.0, sleeves: 26.0, collar: 17.0 },
      pant: { waist: 38.0, hip: 44.0, length: 42.5, inside: 31.5, thigh: 27.5, knee: 20.5, bottom: 17.0 }
    },
    XL: {
      shirt: { length: 33.5, chest: 47.0, gap: 3.5, belly: 43.5, hip: 47.5, shoulder: 20.0, sleeves: 27.0, collar: 18.0 },
      pant: { waist: 42.0, hip: 47.0, length: 43.5, inside: 32.5, thigh: 29.5, knee: 22.0, bottom: 18.0 }
    }
  },

  'uniforms': {
    S: {
      shirt: { length: 29.0, chest: 38.0, gap: 2.0, belly: 34.0, hip: 38.0, shoulder: 17.0, sleeves: 24.0, collar: 15.0 },
      pant: { waist: 30.0, hip: 38.0, length: 39.0, inside: 28.5, thigh: 23.5, knee: 17.5, bottom: 15.0 }
    },
    M: {
      shirt: { length: 30.5, chest: 41.0, gap: 2.5, belly: 37.0, hip: 41.0, shoulder: 18.0, sleeves: 25.0, collar: 16.0 },
      pant: { waist: 34.0, hip: 41.0, length: 41.0, inside: 30.0, thigh: 25.5, knee: 19.0, bottom: 16.0 }
    },
    L: {
      shirt: { length: 32.0, chest: 44.0, gap: 3.0, belly: 40.0, hip: 44.0, shoulder: 19.0, sleeves: 26.0, collar: 17.0 },
      pant: { waist: 38.0, hip: 44.0, length: 42.5, inside: 31.5, thigh: 27.5, knee: 20.5, bottom: 17.0 }
    },
    XL: {
      shirt: { length: 33.5, chest: 47.0, gap: 3.5, belly: 43.0, hip: 47.0, shoulder: 20.0, sleeves: 27.0, collar: 18.0 },
      pant: { waist: 42.0, hip: 47.0, length: 43.5, inside: 32.5, thigh: 29.5, knee: 22.0, bottom: 18.0 }
    }
  }
};
