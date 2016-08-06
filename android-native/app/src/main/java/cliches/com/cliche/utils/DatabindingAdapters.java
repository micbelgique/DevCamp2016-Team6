package cliches.com.cliche.utils;

/**
 * Created by fstephany on 06/08/16.
 */


import android.databinding.BindingAdapter;
import android.view.View;
import android.widget.ImageView;

import com.bumptech.glide.Glide;

/**
 * I provide custom adapters for DataBinding.
 * See https://developer.android.com/tools/data-binding/guide.html#custom_setters
 * for more information.
 */
public class DatabindingAdapters {

    @BindingAdapter("visibility")
    public static void setVisibility(View view, Boolean isVisible){
        if(isVisible == null) {
            return;
        }

        view.setVisibility(isVisible ? View.VISIBLE : View.GONE);
    }

    @BindingAdapter({"imageUrl"})
    public static void loadImage(ImageView view, String imageUrl) {
        Glide.with(view.getContext())
                .load(imageUrl)
                .fitCenter()
                .into(view);
    }
}
