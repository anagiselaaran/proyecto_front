import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dptoTransform',
    standalone: true
})
export class DptoTransformPipe implements PipeTransform {
    private departamentos: any = {
        "development": "Desarrollo",
        "marketing": "Marketing",
        "human-resources": "Recursos Humanos",
        "administration": "Administración"
    }

    transform(value: unknown, ...args: unknown[]): unknown {
        if (typeof value === 'string') {
            return this.departamentos[value];
        } else {
            return value;
        }
    }

}
