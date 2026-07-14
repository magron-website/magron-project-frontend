/* ==========================================================================
   DAWA MAGSEALED — 릴 수리용 자성유체 (MAG OIL)
   Images cropped from the original catalogue (magoil_1 ~ magoil_4);
   descriptions are written separately from the images.
   ========================================================================== */

import heroReel from '@/assets/images/magoil/magoil_1.avif'
import productPackage from '@/assets/images/magoil/crops/product-package.png'
import productBottle from '@/assets/images/magoil/crops/product-bottle.png'
import sealPrincipleDiagram from '@/assets/images/magoil/crops/seal-principle-diagram.png'
import sealPrincipleReel from '@/assets/images/magoil/crops/seal-principle-reel.png'
import sealStep1 from '@/assets/images/magoil/crops/seal-step-1.png'
import sealStep2 from '@/assets/images/magoil/crops/seal-step-2.png'
import sealStep3 from '@/assets/images/magoil/crops/seal-step-3.png'
import internalCrossSection from '@/assets/images/magoil/crops/internal-crosssection.png'
import internalCutaway from '@/assets/images/magoil/crops/internal-cutaway.png'

export {
  heroReel,
  sealPrincipleDiagram,
  sealPrincipleReel,
  internalCrossSection,
  internalCutaway,
}

/** Image lists — captions/text live in the `magoil` i18n namespace, zipped by index. */
export const PACKAGE_IMAGES = [productPackage, productBottle] as const
export const SEAL_STEP_IMAGES = [sealStep1, sealStep2, sealStep3] as const
