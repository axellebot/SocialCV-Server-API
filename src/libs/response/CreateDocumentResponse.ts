'use strict';

import { Messages } from '../constant';
import { DataResponse } from './DataResponse';

export class CreateDocumentResponse<T> extends DataResponse {
  constructor(documentSaved: T) {
    super(documentSaved, Messages.MESSAGE_SUCCESS_RESOURCE_CREATED);
  }
}
