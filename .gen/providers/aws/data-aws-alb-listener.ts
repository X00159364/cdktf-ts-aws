// https://www.terraform.io/docs/providers/aws/r/data_aws_alb_listener.html
// generated from terraform resource schema

import { Construct } from 'constructs';
import { TerraformDataSource } from 'cdktf';
import { TerraformMetaArguments } from 'cdktf';
import { ComplexComputedList } from "cdktf";

// Configuration

export interface DataAwsAlbListenerConfig extends TerraformMetaArguments {
  readonly loadBalancerArn?: string;
  readonly port?: number;
}
export class DataAwsAlbListenerDefaultActionAuthenticateCognito extends ComplexComputedList {

  // authentication_request_extra_params - computed: true, optional: false, required: false
  public get authenticationRequestExtraParams() {
    return this.interpolationForAttribute('authentication_request_extra_params') as any;
  }

  // on_unauthenticated_request - computed: true, optional: false, required: false
  public get onUnauthenticatedRequest() {
    return this.getStringAttribute('on_unauthenticated_request');
  }

  // scope - computed: true, optional: false, required: false
  public get scope() {
    return this.getStringAttribute('scope');
  }

  // session_cookie_name - computed: true, optional: false, required: false
  public get sessionCookieName() {
    return this.getStringAttribute('session_cookie_name');
  }

  // session_timeout - computed: true, optional: false, required: false
  public get sessionTimeout() {
    return this.getNumberAttribute('session_timeout');
  }

  // user_pool_arn - computed: true, optional: false, required: false
  public get userPoolArn() {
    return this.getStringAttribute('user_pool_arn');
  }

  // user_pool_client_id - computed: true, optional: false, required: false
  public get userPoolClientId() {
    return this.getStringAttribute('user_pool_client_id');
  }

  // user_pool_domain - computed: true, optional: false, required: false
  public get userPoolDomain() {
    return this.getStringAttribute('user_pool_domain');
  }
}
export class DataAwsAlbListenerDefaultActionAuthenticateOidc extends ComplexComputedList {

  // authentication_request_extra_params - computed: true, optional: false, required: false
  public get authenticationRequestExtraParams() {
    return this.interpolationForAttribute('authentication_request_extra_params') as any;
  }

  // authorization_endpoint - computed: true, optional: false, required: false
  public get authorizationEndpoint() {
    return this.getStringAttribute('authorization_endpoint');
  }

  // client_id - computed: true, optional: false, required: false
  public get clientId() {
    return this.getStringAttribute('client_id');
  }

  // client_secret - computed: true, optional: false, required: false
  public get clientSecret() {
    return this.getStringAttribute('client_secret');
  }

  // issuer - computed: true, optional: false, required: false
  public get issuer() {
    return this.getStringAttribute('issuer');
  }

  // on_unauthenticated_request - computed: true, optional: false, required: false
  public get onUnauthenticatedRequest() {
    return this.getStringAttribute('on_unauthenticated_request');
  }

  // scope - computed: true, optional: false, required: false
  public get scope() {
    return this.getStringAttribute('scope');
  }

  // session_cookie_name - computed: true, optional: false, required: false
  public get sessionCookieName() {
    return this.getStringAttribute('session_cookie_name');
  }

  // session_timeout - computed: true, optional: false, required: false
  public get sessionTimeout() {
    return this.getNumberAttribute('session_timeout');
  }

  // token_endpoint - computed: true, optional: false, required: false
  public get tokenEndpoint() {
    return this.getStringAttribute('token_endpoint');
  }

  // user_info_endpoint - computed: true, optional: false, required: false
  public get userInfoEndpoint() {
    return this.getStringAttribute('user_info_endpoint');
  }
}
export class DataAwsAlbListenerDefaultActionFixedResponse extends ComplexComputedList {

  // content_type - computed: true, optional: false, required: false
  public get contentType() {
    return this.getStringAttribute('content_type');
  }

  // message_body - computed: true, optional: false, required: false
  public get messageBody() {
    return this.getStringAttribute('message_body');
  }

  // status_code - computed: true, optional: false, required: false
  public get statusCode() {
    return this.getStringAttribute('status_code');
  }
}
export class DataAwsAlbListenerDefaultActionRedirect extends ComplexComputedList {

  // host - computed: true, optional: false, required: false
  public get host() {
    return this.getStringAttribute('host');
  }

  // path - computed: true, optional: false, required: false
  public get path() {
    return this.getStringAttribute('path');
  }

  // port - computed: true, optional: false, required: false
  public get port() {
    return this.getStringAttribute('port');
  }

  // protocol - computed: true, optional: false, required: false
  public get protocol() {
    return this.getStringAttribute('protocol');
  }

  // query - computed: true, optional: false, required: false
  public get query() {
    return this.getStringAttribute('query');
  }

  // status_code - computed: true, optional: false, required: false
  public get statusCode() {
    return this.getStringAttribute('status_code');
  }
}
export class DataAwsAlbListenerDefaultAction extends ComplexComputedList {

  // authenticate_cognito - computed: true, optional: false, required: false
  public get authenticateCognito() {
    return this.interpolationForAttribute('authenticate_cognito') as any;
  }

  // authenticate_oidc - computed: true, optional: false, required: false
  public get authenticateOidc() {
    return this.interpolationForAttribute('authenticate_oidc') as any;
  }

  // fixed_response - computed: true, optional: false, required: false
  public get fixedResponse() {
    return this.interpolationForAttribute('fixed_response') as any;
  }

  // order - computed: true, optional: false, required: false
  public get order() {
    return this.getNumberAttribute('order');
  }

  // redirect - computed: true, optional: false, required: false
  public get redirect() {
    return this.interpolationForAttribute('redirect') as any;
  }

  // target_group_arn - computed: true, optional: false, required: false
  public get targetGroupArn() {
    return this.getStringAttribute('target_group_arn');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }
}

// Resource

export class DataAwsAlbListener extends TerraformDataSource {

  // ===========
  // INITIALIZER
  // ===========

  public constructor(scope: Construct, id: string, config: DataAwsAlbListenerConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'aws_alb_listener',
      terraformGeneratorMetadata: {
        providerName: 'aws'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle
    });
    this._loadBalancerArn = config.loadBalancerArn;
    this._port = config.port;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // arn - computed: true, optional: true, required: false
  public get arn() {
    return this.getStringAttribute('arn');
  }

  // certificate_arn - computed: true, optional: false, required: false
  public get certificateArn() {
    return this.getStringAttribute('certificate_arn');
  }

  // default_action - computed: true, optional: false, required: false
  public defaultAction(index: string) {
    return new DataAwsAlbListenerDefaultAction(this, 'default_action', index);
  }

  // id - computed: true, optional: true, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // load_balancer_arn - computed: true, optional: true, required: false
  private _loadBalancerArn?: string;
  public get loadBalancerArn() {
    return this.getStringAttribute('load_balancer_arn');
  }
  public set loadBalancerArn(value: string) {
    this._loadBalancerArn = value;
  }
  public resetLoadBalancerArn() {
    this._loadBalancerArn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get loadBalancerArnInput() {
    return this._loadBalancerArn
  }

  // port - computed: true, optional: true, required: false
  private _port?: number;
  public get port() {
    return this.getNumberAttribute('port');
  }
  public set port(value: number) {
    this._port = value;
  }
  public resetPort() {
    this._port = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get portInput() {
    return this._port
  }

  // protocol - computed: true, optional: false, required: false
  public get protocol() {
    return this.getStringAttribute('protocol');
  }

  // ssl_policy - computed: true, optional: false, required: false
  public get sslPolicy() {
    return this.getStringAttribute('ssl_policy');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      load_balancer_arn: this._loadBalancerArn,
      port: this._port,
    };
  }
}
