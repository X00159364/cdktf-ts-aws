// https://www.terraform.io/docs/providers/aws/r/waf_web_acl.html
// generated from terraform resource schema

import { Construct } from 'constructs';
import { TerraformResource } from 'cdktf';
import { TerraformMetaArguments } from 'cdktf';

// Configuration

export interface WafWebAclConfig extends TerraformMetaArguments {
  readonly metricName: string;
  readonly name: string;
  readonly tags?: { [key: string]: string };
  /** default_action block */
  readonly defaultAction: WafWebAclDefaultAction[];
  /** logging_configuration block */
  readonly loggingConfiguration?: WafWebAclLoggingConfiguration[];
  /** rules block */
  readonly rules?: WafWebAclRules[];
}
export interface WafWebAclDefaultAction {
  readonly type: string;
}
export interface WafWebAclLoggingConfigurationRedactedFieldsFieldToMatch {
  readonly data?: string;
  readonly type: string;
}
export interface WafWebAclLoggingConfigurationRedactedFields {
  /** field_to_match block */
  readonly fieldToMatch: WafWebAclLoggingConfigurationRedactedFieldsFieldToMatch[];
}
export interface WafWebAclLoggingConfiguration {
  readonly logDestination: string;
  /** redacted_fields block */
  readonly redactedFields?: WafWebAclLoggingConfigurationRedactedFields[];
}
export interface WafWebAclRulesAction {
  readonly type: string;
}
export interface WafWebAclRulesOverrideAction {
  readonly type: string;
}
export interface WafWebAclRules {
  readonly priority: number;
  readonly ruleId: string;
  readonly type?: string;
  /** action block */
  readonly action?: WafWebAclRulesAction[];
  /** override_action block */
  readonly overrideAction?: WafWebAclRulesOverrideAction[];
}

// Resource

export class WafWebAcl extends TerraformResource {

  // ===========
  // INITIALIZER
  // ===========

  public constructor(scope: Construct, id: string, config: WafWebAclConfig) {
    super(scope, id, {
      terraformResourceType: 'aws_waf_web_acl',
      terraformGeneratorMetadata: {
        providerName: 'aws'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle
    });
    this._metricName = config.metricName;
    this._name = config.name;
    this._tags = config.tags;
    this._defaultAction = config.defaultAction;
    this._loggingConfiguration = config.loggingConfiguration;
    this._rules = config.rules;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // arn - computed: true, optional: false, required: false
  public get arn() {
    return this.getStringAttribute('arn');
  }

  // id - computed: true, optional: true, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // metric_name - computed: false, optional: false, required: true
  private _metricName: string;
  public get metricName() {
    return this.getStringAttribute('metric_name');
  }
  public set metricName(value: string) {
    this._metricName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get metricNameInput() {
    return this._metricName
  }

  // name - computed: false, optional: false, required: true
  private _name: string;
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name
  }

  // tags - computed: false, optional: true, required: false
  private _tags?: { [key: string]: string };
  public get tags() {
    return this.interpolationForAttribute('tags') as any;
  }
  public set tags(value: { [key: string]: string } ) {
    this._tags = value;
  }
  public resetTags() {
    this._tags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagsInput() {
    return this._tags
  }

  // default_action - computed: false, optional: false, required: true
  private _defaultAction: WafWebAclDefaultAction[];
  public get defaultAction() {
    return this.interpolationForAttribute('default_action') as any;
  }
  public set defaultAction(value: WafWebAclDefaultAction[]) {
    this._defaultAction = value;
  }
  // Temporarily expose input value. Use with caution.
  public get defaultActionInput() {
    return this._defaultAction
  }

  // logging_configuration - computed: false, optional: true, required: false
  private _loggingConfiguration?: WafWebAclLoggingConfiguration[];
  public get loggingConfiguration() {
    return this.interpolationForAttribute('logging_configuration') as any;
  }
  public set loggingConfiguration(value: WafWebAclLoggingConfiguration[] ) {
    this._loggingConfiguration = value;
  }
  public resetLoggingConfiguration() {
    this._loggingConfiguration = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get loggingConfigurationInput() {
    return this._loggingConfiguration
  }

  // rules - computed: false, optional: true, required: false
  private _rules?: WafWebAclRules[];
  public get rules() {
    return this.interpolationForAttribute('rules') as any;
  }
  public set rules(value: WafWebAclRules[] ) {
    this._rules = value;
  }
  public resetRules() {
    this._rules = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get rulesInput() {
    return this._rules
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      metric_name: this._metricName,
      name: this._name,
      tags: this._tags,
      default_action: this._defaultAction,
      logging_configuration: this._loggingConfiguration,
      rules: this._rules,
    };
  }
}
