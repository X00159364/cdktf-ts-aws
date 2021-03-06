// https://www.terraform.io/docs/providers/aws/r/s3_bucket_analytics_configuration.html
// generated from terraform resource schema

import { Construct } from 'constructs';
import { TerraformResource } from 'cdktf';
import { TerraformMetaArguments } from 'cdktf';

// Configuration

export interface S3BucketAnalyticsConfigurationConfig extends TerraformMetaArguments {
  readonly bucket: string;
  readonly name: string;
  /** filter block */
  readonly filter?: S3BucketAnalyticsConfigurationFilter[];
  /** storage_class_analysis block */
  readonly storageClassAnalysis?: S3BucketAnalyticsConfigurationStorageClassAnalysis[];
}
export interface S3BucketAnalyticsConfigurationFilter {
  readonly prefix?: string;
  readonly tags?: { [key: string]: string };
}
export interface S3BucketAnalyticsConfigurationStorageClassAnalysisDataExportDestinationS3BucketDestination {
  readonly bucketAccountId?: string;
  readonly bucketArn: string;
  readonly format?: string;
  readonly prefix?: string;
}
export interface S3BucketAnalyticsConfigurationStorageClassAnalysisDataExportDestination {
  /** s3_bucket_destination block */
  readonly s3BucketDestination: S3BucketAnalyticsConfigurationStorageClassAnalysisDataExportDestinationS3BucketDestination[];
}
export interface S3BucketAnalyticsConfigurationStorageClassAnalysisDataExport {
  readonly outputSchemaVersion?: string;
  /** destination block */
  readonly destination: S3BucketAnalyticsConfigurationStorageClassAnalysisDataExportDestination[];
}
export interface S3BucketAnalyticsConfigurationStorageClassAnalysis {
  /** data_export block */
  readonly dataExport: S3BucketAnalyticsConfigurationStorageClassAnalysisDataExport[];
}

// Resource

export class S3BucketAnalyticsConfiguration extends TerraformResource {

  // ===========
  // INITIALIZER
  // ===========

  public constructor(scope: Construct, id: string, config: S3BucketAnalyticsConfigurationConfig) {
    super(scope, id, {
      terraformResourceType: 'aws_s3_bucket_analytics_configuration',
      terraformGeneratorMetadata: {
        providerName: 'aws'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle
    });
    this._bucket = config.bucket;
    this._name = config.name;
    this._filter = config.filter;
    this._storageClassAnalysis = config.storageClassAnalysis;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // bucket - computed: false, optional: false, required: true
  private _bucket: string;
  public get bucket() {
    return this.getStringAttribute('bucket');
  }
  public set bucket(value: string) {
    this._bucket = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bucketInput() {
    return this._bucket
  }

  // id - computed: true, optional: true, required: false
  public get id() {
    return this.getStringAttribute('id');
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

  // filter - computed: false, optional: true, required: false
  private _filter?: S3BucketAnalyticsConfigurationFilter[];
  public get filter() {
    return this.interpolationForAttribute('filter') as any;
  }
  public set filter(value: S3BucketAnalyticsConfigurationFilter[] ) {
    this._filter = value;
  }
  public resetFilter() {
    this._filter = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get filterInput() {
    return this._filter
  }

  // storage_class_analysis - computed: false, optional: true, required: false
  private _storageClassAnalysis?: S3BucketAnalyticsConfigurationStorageClassAnalysis[];
  public get storageClassAnalysis() {
    return this.interpolationForAttribute('storage_class_analysis') as any;
  }
  public set storageClassAnalysis(value: S3BucketAnalyticsConfigurationStorageClassAnalysis[] ) {
    this._storageClassAnalysis = value;
  }
  public resetStorageClassAnalysis() {
    this._storageClassAnalysis = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get storageClassAnalysisInput() {
    return this._storageClassAnalysis
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      bucket: this._bucket,
      name: this._name,
      filter: this._filter,
      storage_class_analysis: this._storageClassAnalysis,
    };
  }
}
