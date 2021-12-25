import { Column, Entity, ManyToMany } from 'typeorm';
import { Role } from '.';
import { Base } from './base.model';

// oauth_access_tokens:write oauth_access_tokens:read oauth_access_tokens:delete
// oauth_authorization_codes:write oauth_authorization_codes:read oauth_authorization_codes:delete
// oauth_clients:write oauth_clients:read oauth_clients:delete
// oauth_refresh_tokens:write oauth_refresh_tokens:read oauth_refresh_tokens:delete
// oauth_scopes:write oauth_scopes:read oauth_scopes:delete

// account:read
// entries:write entries:read entries:delete
// groups:write groups:read groups:delete
// parts:write parts:read parts:delete
// roles:write roles:read roles:delete
// profiles:write profiles:read profiles:delete
// users:write users:read users:delete

@Entity()
class Scope extends Base {
  @Column()
  name?: string;

  @Column()
  description?: string;

  @ManyToMany(() => Role, (role) => role.scopes)
  roles?: Role[];
}

export { Scope };
