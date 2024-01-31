import moment from 'moment'
import 'moment/locale/pt-br'

moment.locale('pt-br')

export class UtilDate {
    /**
     *
     * @param value
     * @param format
     */
    public static format(value: Date | string | undefined, format: string): string {
        return moment(value).format(format)
    }
}
