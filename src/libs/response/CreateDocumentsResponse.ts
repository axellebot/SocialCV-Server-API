'use strict';

import { Messages } from '../constant';
import { DataResponse } from './DataResponse';

export class CreateDocumentsResponse<T> extends DataResponse {
  constructor(documentsSaved: T[]) {
    super(documentsSaved, Messages.MESSAGE_SUCCESS_RESOURCE_CREATED);
  }
}
