module ApplicationHelper
  def fa(name, suffix = nil)
    if suffix.present?
      "#{content_tag(:i, '', :class => "fa fa-#{name}")}&nbsp;#{suffix}".html_safe
    else
      content_tag(:i, '', :class => "fa fa-#{name}")
    end
  end
end
