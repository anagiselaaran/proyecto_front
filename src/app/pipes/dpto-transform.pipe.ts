import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dptoTransform',
    standalone: true
})
export class DtoTransformPipe implements PipeTransform {
    private departamentos: any = {
        "desarrollo": "Desarrollo",
        "direccion": "Dirección",
        "recursoshumanos": "Recursos Humanos",
        "diseño": "Diseño"
    }

    transform(value: unknown, ...args: unknown[]): unknown {
        if (typeof value === 'string') {
            return this.departamentos[value];
        } else {
            return value;
        }
    }

}
