---
layout: post
title: Zend and the Youtube API
tags: [php, zend, youtube-api]
comments: true
---

The Zend Framework comes with a rather handy module called GData. The GData module handles basically everything Google Apps contain including support for the Youtube API. Youtube’s API documentation when first viewed can be rather scary to look at but thanks to the Zend_GData libary a lot of the heavy lifting has been done. The purpose of this post is to document how to use the browser based uploads to a central user and set particular permissions on the video uploaded.

Firstly you’ll need a [developer’s key](http://code.google.com/apis/youtube/dashboard/), for testing purposes the central user (video repository) should be the same as which you set this developer’s key up.

For setting up a central user we will use the Zend_Gdata_ClientLogin. This is not recommended for Web use and for good reason as it posts the email and password and I am guessing its possible to work out these details from the token given back for the form. I am yet to find another way to accomplish this task without the requirement for the user to login to youtube which even then doesn’t do what we want at all. The Zend_Gdata_ClientLogin class has the static method getHttpClient which we only really require the first 3 parameters email, password and service name.

```php
$httpClient = Zend_Gdata_ClientLogin::getHttpClient(
    'youtube-email',
    'your password',
    'youtube' // service name
);
```

We now have the http client we are using which is required when setting up the Zend_Gdata_YouTube class, this class also requires the developer’s key.

```php
$yt = new Zend_Gdata_YouTube(
    $httpClient,
    "",
    "",
    "developer-key-here"
);
```

Now we have created a Youtube object, we can create a Youtube Entry object. This is what we will store the title, category, description and basically any meta data for the video that will be uploaded.

```php
$myVideoEntry= new Zend_Gdata_YouTube_VideoEntry();
$myVideoEntry->setVideoTitle('My Test Movie');
$myVideoEntry->setVideoDescription('My Test Movie');
$myVideoEntry->setVideoCategory( "Valid Category" );
```

This is a very basic video entry, however from what I’ve seen only the Title and Category are required fields. From here we can now get a token generated

```php
$yt->getFormUploadToken( $myVideoEntry );
```

This should return array with contents url and token which will be required in the HTML Form.

he HTML Form is rather simple we only require that:

* The Action is set to the URL given from the getFormUploadToken and its highly recommended we append a query of nexturl with the URL that the user should be sent to upon either successful or failed upload
* Make sure we set the enctype with multipart/form-data as we will be uploading a file from the form
* The file field should be name file, it cannot be named anything else. We also need to make sure the user has uploaded a file before submitting however this will be assumed in this demonstration.
* We create a field called token which must contain the token we received from getFormUploadToken

In the end we should have something which looks like this

```php
<form action="<?php echo $this->youtube["url"] ?>?nexturl=http://mydomain<?php echo $this->url( array( "action" => "uploaded" ) ) ?>" method="post" enctype="multipart/form-data">
<input type="file" name="file"/>
<input type="hidden" name="token" value="<?php echo $this->youtube["token"] ?>"/>
<input type="submit" />
</form>
```

Hopefully once its uploaded we will receive in the query string status=200 and id=someid. If you do not get a status of 200 it means the file most likely didn’t upload and an error occurred. This demonstration assumes that we always receive a status of 200.

We again need to setup the httpClient and setup the Youtube Objects

```php
$httpClient = Zend_Gdata_ClientLogin::getHttpClient(
    'youtube-email',
    'your password',
    'youtube' // service name
);
$yt = new Zend_Gdata_YouTube(
    $httpClient,
    "",
    "",
    "developer-key-here"
);
```

We can now create a Youtube Entry object this time we will retrieve a current record (in our case the newly uploaded file).

```php
$videoEntry = $yt->getVideoEntry( $this->getRequest()->getParam("id"), NULL, TRUE );
```

* The first parameter is the ID of the video we uploaded
* The second parameter is the location and is optional, we leave this out
* The last parameter we set to TRUE, this means we want to get the full contents of the entry and assuming its a video we own (our central user which we should) we will get an Edit link back. Without this setting set to TRUE we will not obtain this edit link.

Next we want to setup the access control (permissions) of this video. Currently the video is set to public which means it can be searched for and viewed. We may require that the video be public however not listed in the search and other things (if you know the URL you can access it only). Since we will want to use this in an application we may want to turn various other things off too such as comments, voting etc, you can see a full list of [access controls here](http://code.google.com/apis/youtube/2.0/reference.html?youtube_data_api_tag_yt:accessControl).

Below is the code to deny all the following permissions listings, rating, comments, comment voting, videos to respond to our video.

```php
$actions = array(
    "list",
    "rate",
    "comment",
    "commentVote",
    "videoRespond"
);

$accessControlElement = array();

foreach ( $actions as $i => $action )
{
    $accessControlElement[$i] = new Zend_Gdata_App_Extension_Element('yt:accessControl', 'yt', 'http://gdata.youtube.com/schemas/2007', '');
    $accessControlElement[$i]->extensionAttributes = array(
        array(
            'namespaceUri' => '',
            'name' => 'action',
            'value' => $action
        ),
        array(
            'namespaceUri' => '',
            'name' => 'permission',
            'value' => 'denied'
        )   
    );
}
$videoEntry->extensionElements = $accessControlElement;
```

Now we have that sorted we need to get the URL where we can edit this metadata.

```php
$putUrl = $videoEntry->getEditLink()->getHref();
```

Now finally we can update the entry again we call the Youtube object to do this.

```php
$yt->updateEntry( $videoEntry, $putUrl );
```

Now our video should be relatively private but still accessible so our application can use it by storing the video ID.

Setting up the access controls in the Zend Framework so we need to use the extension element, hopefully soon this can be updated to be much more simplified.
