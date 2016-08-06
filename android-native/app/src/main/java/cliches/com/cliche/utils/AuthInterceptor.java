package cliches.com.cliche.utils;

import java.io.IOException;

import okhttp3.HttpUrl;
import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

public class AuthInterceptor implements Interceptor {

    private String mDeviceId;

    public AuthInterceptor(String deviceId) {
        mDeviceId = deviceId;
    }

    @Override
    public Response intercept(Chain chain) throws IOException {
        Request request = chain.request();
        HttpUrl url = request.url().newBuilder().addQueryParameter("device_id", mDeviceId).build();
        request = request.newBuilder().url(url).build();

        return chain.proceed(request);
    }
}
