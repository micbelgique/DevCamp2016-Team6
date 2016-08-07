package cliches.com.cliche.utils;

import android.content.Context;
import android.support.design.widget.AppBarLayout;
import android.support.design.widget.CoordinatorLayout;
import android.util.AttributeSet;
import android.view.View;

/**
 * From: http://stackoverflow.com/a/34314147/15361
 */
public class AppBarTransparentScrollingViewBehavior extends AppBarLayout.ScrollingViewBehavior {

    public AppBarTransparentScrollingViewBehavior(Context context, AttributeSet attributeSet) {
        super();
    }


    @Override
    public boolean onDependentViewChanged(CoordinatorLayout parent, View child, View dependency) {
        updateOffset(parent, child, dependency);
        return false;
    }

    private boolean updateOffset(CoordinatorLayout parent, View child, View dependency) {
        final CoordinatorLayout.Behavior behavior = ((CoordinatorLayout.LayoutParams) dependency.getLayoutParams()).getBehavior();
        if (behavior instanceof CoordinatorLayout.Behavior) {
            // Offset the child so that it is below the app-bar (with any overlap)
            final int offset = 0;   // CHANGED TO 0
            setTopAndBottomOffset(offset);
            return true;
        }
        return false;
    }
}
