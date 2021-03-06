/*
 * Copyright (c) Microsoft
 * All rights reserved.
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
// This rule is disabled because DataViewObjectParser needs to see these properties
// If they aren't explicitly initialized, then they don't show up for DataViewObjectParser
// tslint:disable:no-unnecessary-field-initialization
export default class General {
	/**
	 * The text size in pt
	 */
	public textSize?: number = undefined;

	/**
	 * The font color used to display item text
	 */
	public itemTextColor?: string = undefined;

	/**
	 * If we should left align the text
	 */
	public leftAlignText?: boolean = undefined;

	/**
	 * If we should show the options area
	 */
	public showOptions?: boolean = undefined;

	/**
	 * If we should show the search box
	 */
	public showSearch?: boolean = undefined;

	/**
	 * If we are being rendered horizontally
	 */
	public version?: string = undefined;
}
