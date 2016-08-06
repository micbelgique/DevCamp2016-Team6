package cliches.com.cliche.utils;


import java.util.List;

import cliches.com.cliche.models.Mission;
import cliches.com.cliche.models.Spot;
import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.ResponseBody;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava.RxJavaCallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;
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

    public ClicheInterface getApi() {
        return mApi;
    }

    public interface ClicheInterface {
        @GET("api/missions")
        Observable<List<Mission>> getMissions();

        @GET("api/missions/{missionId}/spots")
        Observable<List<Spot>> getSpots(@Path("missionId") int missionId);

        @FormUrlEncoded
        @POST("api/missions/{missionId}/spots/{spot_id}/user_spot_links")
        Observable<ResponseBody> sendPicture(
                @Path("missionId") int missionId,
                @Path("spot_id") int spotId,
                @Field("[user_spot_link][picture]") String request);
    }
}
