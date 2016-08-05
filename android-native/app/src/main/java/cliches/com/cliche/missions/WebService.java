package cliches.com.cliche.missions;


import java.util.List;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava.RxJavaCallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.GET;
import rx.Observable;

public class WebService {

    private ClicheInterface mApi;

    public WebService(Interceptor authInterceptor) {

        HttpLoggingInterceptor logging = new HttpLoggingInterceptor();
        logging.setLevel(HttpLoggingInterceptor.Level.BODY);

        OkHttpClient client = new OkHttpClient.Builder()
                .addInterceptor(logging)
                .addInterceptor(authInterceptor)
                .build();

        Retrofit retrofit =  new Retrofit.Builder()
                .baseUrl("http://cliche-backend.phonoid.net")
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .addCallAdapterFactory(RxJavaCallAdapterFactory.create())
                .build();

        mApi = retrofit.create(ClicheInterface.class);
    }

    public interface ClicheInterface {
        @GET("api/missions")
        Observable<List<Mission>> getMissions();
    }

    public ClicheInterface getApi() {
        return mApi;
    }
}
