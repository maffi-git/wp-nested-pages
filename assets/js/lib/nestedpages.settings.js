var NestedPages = NestedPages || {};

/**
* Settings
* @package Nested Pages
* @author Kyle Phillips - https://github.com/kylephillips/wp-nested-pages
*/
NestedPages.Settings = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.selectors = {
		postTypeToggle : '[data-toggle-nestedpages-pt-settings]', // Toggle Button for Post Type Settings
		postTypeCheckbox : '[data-nestedpages-pt-checbox]', // Checkbox for enabling post type
		customFieldsCheckbox : '[data-toggle-nestedpages-cf-settings]', // Checkbox for toggling custom fields settings
		standardFieldsCheckbox : '[data-toggle-nestedpages-sf-settings]', // Checkbox for toggling standard field settings
	}

	plugin.bindEvents = function()
	{
		$(document).ready(function(){
			plugin.toggleAllSettingsButtons();
			plugin.toogleAllFieldSettings('.custom-fields');
			plugin.toogleAllFieldSettings('.standard-fields');
		});
		$(document).on('click', plugin.selectors.postTypeToggle, function(e){
			e.preventDefault();
			plugin.togglePostTypeSettings($(this));
		});
		$(document).on('change', plugin.selectors.postTypeCheckbox, function(){
			plugin.toggleSettingsButton($(this));
		});
		$(document).on('change', plugin.selectors.customFieldsCheckbox, function(){
			plugin.toogleFieldSettings($(this), '.custom-fields');
		});
		$(document).on('change', plugin.selectors.standardFieldsCheckbox, function(){
			plugin.toogleFieldSettings($(this), '.standard-fields');
		});
	}

	/**
	* Toggle Individual Post Type Settings
	*/
	plugin.togglePostTypeSettings = function(button)
	{
		$(button).parent('.head').siblings('.body').toggle();
		$(button).parents('.post-type').toggleClass('active');
	}

	/**
	* Show/Hide the settings toggle button for enabled/disabled post types
	*/
	plugin.toggleSettingsButton = function(checkbox)
	{
		var button = $(checkbox).parents('.head').find(plugin.selectors.postTypeToggle);
		if ( $(checkbox).is(':checked') ){
			$(button).show();
			return;
		}
		$(button).hide();
		$(button).parents('.head').siblings('.body').hide();
		$(button).parents('.post-type').removeClass('active');
		$(button).parents('.head').siblings('.body').find('input[type="checkbox"]').attr('checked', false);
	}

	/**
	* Toggle all the settings toggle buttons
	*/
	plugin.toggleAllSettingsButtons = function()
	{
		var checkboxes = $(plugin.selectors.postTypeCheckbox);
		$.each(checkboxes, function(){
			plugin.toggleSettingsButton($(this));
		});
	}

	/**
	* Toggle Custom Field Choices
	*/
	plugin.toogleFieldSettings = function(checkbox, fieldGroupClass)
	{
		var choices = $(checkbox).parents('.body').find(fieldGroupClass);
		if ( $(checkbox).is(':checked') ){
			$(choices).show();
			return;
		}
		$(choices).hide();
	}

	/**
	* Toggle All the Custom Field Choices
	*/
	plugin.toogleAllFieldSettings = function(fieldGroupClass)
	{
		var checkboxes = $(plugin.selectors.customFieldsCheckbox);
		if ( fieldGroupClass == '.standard-fields' ){
			var checkboxes = $(plugin.selectors.standardFieldsCheckbox);
		}
		$.each(checkboxes, function(){
			plugin.toogleFieldSettings($(this), fieldGroupClass);
		});
	}

	plugin.init = function()
	{
		plugin.bindEvents();
	}

	return plugin.init();
}

new NestedPages.Settings;