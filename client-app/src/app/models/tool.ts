export interface ITool {
id: string;
name: string;
description: string;
category: string;
createdOn: Date;
createdBy: string;
}

export interface IToolFormValues extends Partial<ITool> {
    createdOnTime?:Date

}

export class ToolFormValues implements IToolFormValues {
    id?: string = undefined;
    name: string = '';
    description: string = '';
    category: string = '';
    createdOn?: Date = undefined;
    createdOnTime?: Date = undefined;
    createdBy: string = '';

    constructor(init?: IToolFormValues) {
        if (init && init.createdOn) {
            init.createdOnTime = init.createdOn;
        }
        Object.assign(this, init);
    }
}
