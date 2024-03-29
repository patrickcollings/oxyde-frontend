export class Template { 
    id: string = '';
    name: string = '';
    versions: [
        {
            id: string;
            name: string;
            subject: string;
            template_id: string;
            html_content: string;
            test_data: string;
            plain_content: string;
        }
    ] = [
        {
            id: '',
            name: '',
            subject: '',
            template_id: '',
            html_content: '',
            test_data: '',
            plain_content: ''
        }
    ]
}

export interface ITemplate {
    template: {
      id: string;
      name: string;
      versions: [
        {
          id: string;
          name: string;
          subject: string;
          template_id: string;
          html_content: string;
          test_data: string;
          plain_content: string;
        }
      ]
    }
  }