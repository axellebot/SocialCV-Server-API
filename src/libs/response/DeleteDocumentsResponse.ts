import { DataResponse } from '.';
import { Messages } from '../constant';

export class DeleteDocumentsResponse extends DataResponse {
  constructor(count: number = 0) {
    super(null, `${count} ${Messages.MESSAGE_SUCCESS_RESOURCE_DELETED}`);
  }
}
