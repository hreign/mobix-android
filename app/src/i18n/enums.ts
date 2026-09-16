import type { LangCode } from './locale'

type BatteryStatus = 'CHARGING' | 'DISCHARGING' | 'NOT_CHARGING' | 'FULL' | 'UNKNOWN'
type BatteryPlugged = 'UNPLUGGED' | 'PLUGGED_AC' | 'PLUGGED_USB' | 'PLUGGED_WIRELESS' | 'PLUGGED_DOCK' | 'UNKNOWN'
type SimState =
  | 'ABSENT' | 'PIN_REQUIRED' | 'PUK_REQUIRED' | 'NETWORK_LOCKED'
  | 'READY' | 'NOT_READY' | 'PERM_DISABLED' | 'CARD_IO_ERROR' | 'CARD_RESTRICTED' | 'UNKNOWN'
type CallType = 'INCOMING' | 'OUTGOING' | 'MISSED' | 'UNKNOWN'

const batteryStatusMap: Record<LangCode, Record<BatteryStatus, string>> = {
  zh: { CHARGING: '正在充电', DISCHARGING: '放电中', NOT_CHARGING: '未充电', FULL: '已充满', UNKNOWN: '未知' },
  en: { CHARGING: 'Charging', DISCHARGING: 'Discharging', NOT_CHARGING: 'Not Charging', FULL: 'Full', UNKNOWN: 'Unknown' },
  ja: { CHARGING: '充電中', DISCHARGING: '放電中', NOT_CHARGING: '未充電', FULL: '満充電', UNKNOWN: '不明' },
  ko: { CHARGING: '충전 중', DISCHARGING: '방전 중', NOT_CHARGING: '충전 안 됨', FULL: '충전 완료', UNKNOWN: '알 수 없음' },
  fr: { CHARGING: 'En charge', DISCHARGING: 'Décharge', NOT_CHARGING: 'Pas de charge', FULL: 'Complète', UNKNOWN: 'Inconnu' },
  de: { CHARGING: 'Wird geladen', DISCHARGING: 'Entladen', NOT_CHARGING: 'Nicht am Laden', FULL: 'Voll', UNKNOWN: 'Unbekannt' },
  es: { CHARGING: 'Cargando', DISCHARGING: 'Descargando', NOT_CHARGING: 'No cargando', FULL: 'Completa', UNKNOWN: 'Desconocido' },
  ru: { CHARGING: 'Заряжается', DISCHARGING: 'Разряжается', NOT_CHARGING: 'Не заряжается', FULL: 'Полностью', UNKNOWN: 'Неизвестно' },
}

const batteryPluggedMap: Record<LangCode, Record<BatteryPlugged, string>> = {
  zh: { UNPLUGGED: '未连接电源', PLUGGED_AC: '交流充电', PLUGGED_USB: 'USB 充电', PLUGGED_WIRELESS: '无线充电', PLUGGED_DOCK: '底座供电', UNKNOWN: '未知' },
  en: { UNPLUGGED: 'Unplugged', PLUGGED_AC: 'AC Power', PLUGGED_USB: 'USB', PLUGGED_WIRELESS: 'Wireless', PLUGGED_DOCK: 'Dock', UNKNOWN: 'Unknown' },
  ja: { UNPLUGGED: '未接続', PLUGGED_AC: 'AC充電', PLUGGED_USB: 'USB充電', PLUGGED_WIRELESS: 'ワイヤレス充電', PLUGGED_DOCK: 'ドック給電', UNKNOWN: '不明' },
  ko: { UNPLUGGED: '연결 안 됨', PLUGGED_AC: 'AC 충전', PLUGGED_USB: 'USB 충전', PLUGGED_WIRELESS: '무선 충전', PLUGGED_DOCK: '독 충전', UNKNOWN: '알 수 없음' },
  fr: { UNPLUGGED: 'Débranché', PLUGGED_AC: 'Secteur AC', PLUGGED_USB: 'USB', PLUGGED_WIRELESS: 'Sans fil', PLUGGED_DOCK: 'Station d\'accueil', UNKNOWN: 'Inconnu' },
  de: { UNPLUGGED: 'Nicht angeschlossen', PLUGGED_AC: 'AC', PLUGGED_USB: 'USB', PLUGGED_WIRELESS: 'Kabellos', PLUGGED_DOCK: 'Dockingstation', UNKNOWN: 'Unbekannt' },
  es: { UNPLUGGED: 'Desconectado', PLUGGED_AC: 'Corriente AC', PLUGGED_USB: 'USB', PLUGGED_WIRELESS: 'Inalámbrico', PLUGGED_DOCK: 'Base', UNKNOWN: 'Desconocido' },
  ru: { UNPLUGGED: 'Отключён', PLUGGED_AC: 'От сети', PLUGGED_USB: 'USB', PLUGGED_WIRELESS: 'Беспроводная', PLUGGED_DOCK: 'Док-станция', UNKNOWN: 'Неизвестно' },
}

const simStateMap: Record<LangCode, Record<SimState, string>> = {
  zh: {
    ABSENT: '未检测到 SIM 卡', PIN_REQUIRED: '需输入 PIN 码', PUK_REQUIRED: '需输入 PUK 码', NETWORK_LOCKED: '网络锁定',
    READY: '已就绪', NOT_READY: '未就绪', PERM_DISABLED: '永久禁用', CARD_IO_ERROR: '卡读写错误', CARD_RESTRICTED: '受限', UNKNOWN: '未知',
  },
  en: {
    ABSENT: 'No SIM Card', PIN_REQUIRED: 'PIN Required', PUK_REQUIRED: 'PUK Required', NETWORK_LOCKED: 'Network Locked',
    READY: 'Ready', NOT_READY: 'Not Ready', PERM_DISABLED: 'Permanently Disabled', CARD_IO_ERROR: 'Card I/O Error', CARD_RESTRICTED: 'Restricted', UNKNOWN: 'Unknown',
  },
  ja: {
    ABSENT: 'SIMカードなし', PIN_REQUIRED: 'PINコード必要', PUK_REQUIRED: 'PUKコード必要', NETWORK_LOCKED: 'ネットワークロック',
    READY: '準備完了', NOT_READY: '準備未完了', PERM_DISABLED: '永久無効', CARD_IO_ERROR: 'カードIOエラー', CARD_RESTRICTED: '制限あり', UNKNOWN: '不明',
  },
  ko: {
    ABSENT: 'SIM 카드 없음', PIN_REQUIRED: 'PIN 필요', PUK_REQUIRED: 'PUK 필요', NETWORK_LOCKED: '네트워크 잠김',
    READY: '준비 완료', NOT_READY: '준비 안 됨', PERM_DISABLED: '영구 비활성화', CARD_IO_ERROR: '카드 IO 오류', CARD_RESTRICTED: '제한됨', UNKNOWN: '알 수 없음',
  },
  fr: {
    ABSENT: 'Pas de carte SIM', PIN_REQUIRED: 'PIN requis', PUK_REQUIRED: 'PUK requis', NETWORK_LOCKED: 'Réseau verrouillé',
    READY: 'Prêt', NOT_READY: 'Pas prêt', PERM_DISABLED: 'Désactivé définitivement', CARD_IO_ERROR: 'Erreur IO carte', CARD_RESTRICTED: 'Restreint', UNKNOWN: 'Inconnu',
  },
  de: {
    ABSENT: 'Keine SIM-Karte', PIN_REQUIRED: 'PIN erforderlich', PUK_REQUIRED: 'PUK erforderlich', NETWORK_LOCKED: 'Netz gesperrt',
    READY: 'Bereit', NOT_READY: 'Nicht bereit', PERM_DISABLED: 'Dauerhaft deaktiviert', CARD_IO_ERROR: 'Karten-IO-Fehler', CARD_RESTRICTED: 'Eingeschränkt', UNKNOWN: 'Unbekannt',
  },
  es: {
    ABSENT: 'Sin tarjeta SIM', PIN_REQUIRED: 'PIN requerido', PUK_REQUIRED: 'PUK requerido', NETWORK_LOCKED: 'Bloqueo de red',
    READY: 'Listo', NOT_READY: 'No listo', PERM_DISABLED: 'Desactivado permanentemente', CARD_IO_ERROR: 'Error IO de tarjeta', CARD_RESTRICTED: 'Restringido', UNKNOWN: 'Desconocido',
  },
  ru: {
    ABSENT: 'Нет SIM-карты', PIN_REQUIRED: 'Требуется PIN', PUK_REQUIRED: 'Требуется PUK', NETWORK_LOCKED: 'Сеть заблокирована',
    READY: 'Готов', NOT_READY: 'Не готов', PERM_DISABLED: 'Навсегда отключён', CARD_IO_ERROR: 'Ошибка IO карты', CARD_RESTRICTED: 'Ограничен', UNKNOWN: 'Неизвестно',
  },
}

const callTypeMap: Record<LangCode, Record<CallType, string>> = {
  zh: { INCOMING: '来电', OUTGOING: '去电', MISSED: '未接', UNKNOWN: '未知' },
  en: { INCOMING: 'Incoming', OUTGOING: 'Outgoing', MISSED: 'Missed', UNKNOWN: 'Unknown' },
  ja: { INCOMING: '着信', OUTGOING: '発信', MISSED: '不在着信', UNKNOWN: '不明' },
  ko: { INCOMING: '수신', OUTGOING: '발신', MISSED: '부재중', UNKNOWN: '알 수 없음' },
  fr: { INCOMING: 'Entrant', OUTGOING: 'Sortant', MISSED: 'Manqué', UNKNOWN: 'Inconnu' },
  de: { INCOMING: 'Eingehend', OUTGOING: 'Ausgehend', MISSED: 'Verpasst', UNKNOWN: 'Unbekannt' },
  es: { INCOMING: 'Entrante', OUTGOING: 'Saliente', MISSED: 'Perdida', UNKNOWN: 'Desconocido' },
  ru: { INCOMING: 'Входящий', OUTGOING: 'Исходящий', MISSED: 'Пропущенный', UNKNOWN: 'Неизвестно' },
}

function lookup<T extends string>(map: Record<LangCode, Record<T, string>>, lang: LangCode, value: string): string {
  const table = (map[lang] ?? map.en) as Record<string, string>
  return table[value] ?? table.UNKNOWN ?? 'Unknown'
}

export function mapBatteryStatus(lang: LangCode, value: string): string {
  return lookup(batteryStatusMap, lang, value)
}

export function mapBatteryPlugged(lang: LangCode, value: string): string {
  return lookup(batteryPluggedMap, lang, value)
}

export function mapSimState(lang: LangCode, value: string): string {
  return lookup(simStateMap, lang, value)
}

export function mapCallType(lang: LangCode, value: string): string {
  return lookup(callTypeMap, lang, value)
}
