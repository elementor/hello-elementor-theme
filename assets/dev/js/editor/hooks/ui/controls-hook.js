export default class ControlsHook extends $e.modules.hookUI.After {
    getCommand() {
        // Command to listen.
        return 'document/elements/settings';
    }

    getId() {
        // Unique id for the hook.
        return 'hello-elementor-editor-controls-handler';
    }

    /**
     * Get Hello Theme Controls
     *
     * Returns an object in which the keys are control IDs, and the values are the selectors of the elements that need
     * to be targeted in the apply() method.
     *
     * Example return value:
     *   {
     *      hello_elementor_show_logo: '.site-header .site-header-logo',
     *      hello_elementor_show_menu: '.site-header .site-header-menu',
     *   }
     */
    getHelloThemeControls() {
        return {
            hello_header_logo_display: {
                selector: '.site-header .site-logo, .site-header .site-title',
                callback: ( $element, args ) => {
                    this.toggleShowHideClass( $element, args.settings.hello_header_logo_display );
                },
            },
            hello_header_menu_display: {
                selector: '.site-header .site-navigation, .site-header .site-navigation-toggle-holder',
                callback: ( $element, args ) => {
                    this.toggleShowHideClass( $element, args.settings.hello_header_menu_display );
                },
            },
            hello_header_tagline_display: {
                selector: '.site-header .site-description',
                callback: ( $element, args ) => {
                    this.toggleShowHideClass( $element, args.settings.hello_header_tagline_display );
                },
            },
            hello_header_logo_type: {
                selector: '.site-header .site-branding',
                callback: ( $element, args ) => {
                    const classPrefix = 'show-',
                        inputOptions = args.container.controls.hello_header_logo_type.options,
                        inputValue = args.settings.hello_header_logo_type;

                    this.toggleLayoutClass( $element, classPrefix, inputOptions, inputValue );
                },
            },
            hello_header_layout: {
                selector: '.site-header',
                callback: ( $element, args ) => {
                    const classPrefix = 'header-',
                        inputOptions = args.container.controls.hello_header_layout.options,
                        inputValue = args.settings.hello_header_layout;

                    this.toggleLayoutClass( $element, classPrefix, inputOptions, inputValue );
                },
            },
            hello_header_width: {
                selector: '.site-header',
                callback: ( $element, args ) => {
                    const classPrefix = 'header-',
                        inputOptions = args.container.controls.hello_header_width.options,
                        inputValue = args.settings.hello_header_width;

                    this.toggleLayoutClass( $element, classPrefix, inputOptions, inputValue );
                },
            },
            hello_header_menu_layout: {
                selector: '.site-header',
                callback: ( $element, args ) => {
                    const classPrefix = 'menu-layout-',
                        inputOptions = args.container.controls.hello_header_menu_layout.options,
                        inputValue = args.settings.hello_header_menu_layout;

                    this.toggleLayoutClass( $element, classPrefix, inputOptions, inputValue );
                },
            },
            hello_header_menu_dropdown: {
                selector: '.site-header',
                callback: ( $element, args ) => {
                    const classPrefix = 'menu-dropdown-',
                        inputOptions = args.container.controls.hello_header_menu_dropdown.options,
                        inputValue = args.settings.hello_header_menu_dropdown;

                    this.toggleLayoutClass( $element, classPrefix, inputOptions, inputValue );
                },
            },
            hello_footer_logo_display: {
                selector: '.site-footer .site-logo, .site-footer .site-title',
                callback: ( $element, args ) => {
                    this.toggleShowHideClass( $element, args.settings.hello_footer_logo_display );
                },
            },
            hello_footer_tagline_display: {
                selector: '.site-footer .site-description',
                callback: ( $element, args ) => {
                    this.toggleShowHideClass( $element, args.settings.hello_footer_tagline_display );
                },
            },
            hello_footer_menu_display: {
                selector: '.site-footer .site-navigation',
                callback: ( $element, args ) => {
                    this.toggleShowHideClass( $element, args.settings.hello_footer_menu_display );
                },
            },
            hello_footer_copyright_display: {
                selector: '.site-footer .copyright',
                callback: ( $element, args ) => {
                    this.toggleShowHideClass( $element, args.settings.hello_footer_copyright_display );
                },
            },
            hello_footer_logo_type: {
                selector: '.site-footer .site-branding',
                callback: ( $element, args ) => {
                    const classPrefix = 'show-',
                        inputOptions = args.container.controls.hello_footer_logo_type.options,
                        inputValue = args.settings.hello_footer_logo_type;

                    this.toggleLayoutClass( $element, classPrefix, inputOptions, inputValue );
                },
            },
            hello_footer_layout: {
                selector: '.site-footer',
                callback: ( $element, args ) => {
                    const classPrefix = 'footer-',
                        inputOptions = args.container.controls.hello_footer_layout.options,
                        inputValue = args.settings.hello_footer_layout;

                    this.toggleLayoutClass( $element, classPrefix, inputOptions, inputValue );
                },
            },
            hello_footer_width: {
                selector: '.site-footer',
                callback: ( $element, args ) => {
                    const classPrefix = 'footer-',
                        inputOptions = args.container.controls.hello_footer_width.options,
                        inputValue = args.settings.hello_footer_width;

                    this.toggleLayoutClass( $element, classPrefix, inputOptions, inputValue );
                },
            },
        };
    }

    /**
     * Toggle show and hide classes on containers
     *
     * This will remove the .show and .hide clases from the element, then apply the new class
     *
     */
    toggleShowHideClass( element, inputValue ) {
        element.removeClass( 'hide' ).removeClass( 'show' ).addClass( inputValue ? 'show' : 'hide' );
    }

    /**
     * Toggle layout classes on containers
     *
     * This will cleanly set classes onto which ever container we want to target, removing the old classes and adding the new one
     *
     */
    toggleLayoutClass( element, classPrefix, inputOptions, inputValue ) {
        // Loop through the possible classes and remove the one that's not in use
        Object.entries( inputOptions ).forEach( ( [ key, value ] ) => {
            element.removeClass( classPrefix + key );
        } );

        // Append the class which we want to use onto the element
        if ( '' !== inputValue ) {
            element.addClass( classPrefix + inputValue );
        }
    }

    /**
     * Set the conditions under which the hook will run.
     */
    getConditions( args ) {
        const isKit = 'kit' === elementor.documents.getCurrent().config.type,
            changedControls = Object.keys( args.settings ),
            isSingleSetting = 1 === changedControls.length;

        // If the document is not a kit, or there are no changed settings, or there is more than one single changed
        // setting, don't run the hook.
        if ( ! isKit || ! args.settings || ! isSingleSetting ) {
            return false;
        }

        // If the changed control is in the list of theme controls, return true to run the hook.
        // Otherwise, return false so the hook doesn't run.
        return !! Object.keys( this.getHelloThemeControls() ).includes( changedControls[ 0 ] );
    }

    /**
     * The hook logic.
     */
    apply( args, result ) {
        const allThemeControls = this.getHelloThemeControls(),
            // Extract the control ID from the passed args
            controlId = Object.keys( args.settings )[ 0 ],
            controlConfig = allThemeControls[ controlId ],
            // Find the element that needs to be targeted by the control.
            $element = elementor.$previewContents.find( controlConfig.selector );

        controlConfig.callback( $element, args );
    }
}