export declare const Configuration: () => {
    server: {
        env: string | undefined;
        port: number;
        origin: string[];
    };
    mwr: {
        mwr_api: string | undefined;
        loyalty_points_api: {
            base_url: string | undefined;
            loyalty_points_list: string | undefined;
            loyalty_points_balance: string | undefined;
        };
    };
    main_db: {
        host: string | undefined;
        port: number;
        username: string | undefined;
        password: string | undefined;
        database: string | undefined;
        synchronize: string | undefined;
    };
    app: {
        languages: string[];
        currency_rate_api_key: string | undefined;
        currency_rate_api_url: string | undefined;
        can_add_unlimited_traveler: string[];
    };
    email: {
        host: string | undefined;
        user: string | undefined;
        pass: string | undefined;
        port: number;
        secure: boolean;
        bcc: string | undefined;
        cc: string | undefined;
        from: string | undefined;
    };
    s3: {
        accesskey: string | undefined;
        secretKey: string | undefined;
        bucketName: string | undefined;
        awsRegion: string | undefined;
        cloudfrontUrl: string | undefined;
    };
    azure: {
        blob_sas_link: string | undefined;
    };
};
