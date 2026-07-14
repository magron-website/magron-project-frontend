/* ==========================================================================
   Permanent Magnet — 산업용 영구자석 소재 및 등급별 자기특성표
   Table images are the authoritative catalogue tables (magnet_1 ~ magnet_9);
   titles & descriptions are written alongside each table.
   ========================================================================== */

import heroMagnets from '@/assets/images/magnet/magnet_1.avif'
import tblSinteredNdFeB from '@/assets/images/magnet/magnet_2.avif'
import tblBondedCompression from '@/assets/images/magnet/magnet_3.avif'
import tblBondedInjection from '@/assets/images/magnet/magnet_4.avif'
import tblSmCo from '@/assets/images/magnet/magnet_5.avif'
import tblMagneticPowder from '@/assets/images/magnet/magnet_6.avif'
import tblCastAlNiCo from '@/assets/images/magnet/magnet_7.avif'
import tblSinteredAlNiCo from '@/assets/images/magnet/magnet_8.avif'
import tblFerrite from '@/assets/images/magnet/magnet_9.avif'

export { heroMagnets }

/** Table id → catalogue table image. Text lives in the `magnet` i18n namespace. */
export const MAGNET_TABLE_IMAGES: Record<string, string> = {
  'sintered-ndfeb': tblSinteredNdFeB,
  'bonded-compression-ndfeb': tblBondedCompression,
  'bonded-injection-ndfeb': tblBondedInjection,
  'magnetic-powder': tblMagneticPowder,
  smco: tblSmCo,
  'cast-alnico': tblCastAlNiCo,
  'sintered-alnico': tblSinteredAlNiCo,
  ferrite: tblFerrite,
}
