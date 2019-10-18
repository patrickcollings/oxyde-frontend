export class Template { 
    id: string;
    name: string;
    versions: [
        {
            id: string;
            name: string;
            subject: string;
            template_id: string;
        }
    ]
}